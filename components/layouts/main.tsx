"use client";

import React, { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Issue {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    date: string;
    imageUrl: string;
}

const fakeIssues: Issue[] = Array.from({ length: 25 }, (_, i) => {
    const title = `Issue Heading #${i + 1}`;
    const image = `Issue #${i + 1}`;
    return {
        id: i + 1,
        title,
        description: `Description for issue ${i + 1}.`,
        category: ["Roads", "Lighting", "Cleanliness"][i % 3],
        status: ["Reported", "In Progress", "Resolved"][i % 3],
        date: new Date(
            Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-GB"),
        imageUrl: `https://placeholdit.com/600x400/dddddd/999999?text=${encodeURIComponent(image)}`,
    };
});

function getRandomLatLng() {
    const baseLat = 28.6139; // Example: Delhi
    const baseLng = 77.2090;

    const randomLat = baseLat + (Math.random() - 0.5) * 0.1;
    const randomLng = baseLng + (Math.random() - 0.5) * 0.1;

    return `${randomLat.toFixed(5)},${randomLng.toFixed(5)}`;
}

export default function Main() {
    const [page, setPage] = useState(1);
    const perPage = 10;
    const total = fakeIssues.length;
    const totalPages = Math.ceil(total / perPage);

    const pages = Array.from({ length: totalPages }).map((_, idx) => idx + 1);

    const startIndex = (page - 1) * perPage;
    const visible = fakeIssues.slice(startIndex, startIndex + perPage);

    return (
        <main className="p-4 min-h-[100vh] w-full flex flex-col items-center">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-6xl">
                {visible.map((issue) => (
                    <Dialog key={issue.id}>
                        <div className="border p-4 rounded-lg">
                            <img
                                src={issue.imageUrl}
                                alt={issue.title}
                                width={512}
                                height={512}
                                className="rounded-sm dark:opacity-50"
                            />
                            <div className="flex w-full text-xs justify-between mt-2 text-accent-foreground/80">
                                <span>{issue.category}</span>
                                <div className="flex items-center gap-2">
                                    <span>{issue.status}</span>
                                    <span>{issue.date}</span>
                                </div>
                            </div>
                            <div className="mt-2 text-lg font-semibold">{issue.title}</div>
                            <div className="mt-2 text-sm text-accent-foreground">
                                {issue.description}
                            </div>

                            {/* Dialog Trigger */}
                            <DialogTrigger asChild>
                                <Button variant="outline" className="mt-4 w-full">
                                    View Details
                                </Button>
                            </DialogTrigger>
                        </div>

                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                            <DialogHeader>
                                <DialogTitle>{issue.title}</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                    Detailed view of the issue reported on {issue.date}
                                </DialogDescription>
                            </DialogHeader>

                            {/* Scrollable content container */}
                            <div className="flex-1 overflow-y-auto space-y-4 mt-4 mb-4">
                                <img
                                    src={issue.imageUrl}
                                    alt={issue.title}
                                    className="w-full h-auto rounded-md dark:opacity-50"
                                />

                                <div className="h-[250px] w-full rounded-md overflow-hidden">
                                    <iframe
                                        title="Issue Location"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        allowFullScreen
                                        className="dark:opacity-80"
                                        src={`https://www.google.com/maps?q=${getRandomLatLng()}&output=embed`}
                                    />
                                </div>

                                <p>
                                    <strong>Status:</strong> {issue.status}
                                </p>
                                <p>
                                    <strong>Category:</strong> {issue.category}
                                </p>
                                <p>
                                    <strong>Description:</strong> {issue.description}
                                </p>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Close</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>

            <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage((p) => Math.max(1, p - 1));
                            }}
                        />
                    </PaginationItem>

                    {pages.map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(p);
                                }}
                                isActive={p === page}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {totalPages > pages.length && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage((p) => Math.min(totalPages, p + 1));
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}
