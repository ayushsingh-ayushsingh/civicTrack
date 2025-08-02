"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AvatarDropdown from "@/components/layouts/avatar-dropdown";
import SheetComponent from "@/components/layouts/sheet-component";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Issue {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    date: string;
    imageUrl: string;
}

const USER_ISSUES_KEY = "user_issues";

export default function Navbar() {
    const [userIssues, setUserIssues] = useState<Issue[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(USER_ISSUES_KEY);
        if (stored) {
            try {
                setUserIssues(JSON.parse(stored));
            } catch (error) {
                console.error("Error loading user issues:", error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(USER_ISSUES_KEY, JSON.stringify(userIssues));
    }, [userIssues]);

    const [newIssue, setNewIssue] = useState<Omit<Issue, "id" | "date" | "status">>({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setNewIssue((prev) => ({ ...prev, [name]: value }));
    }

    // Add new issue at the start of array
    function addNewIssue(closeDialog: () => void) {
        if (!newIssue.title || !newIssue.description || !newIssue.category) {
            alert("Please fill all required fields");
            return;
        }

        const newId = userIssues.length ? userIssues[0].id + 1 : 1000; // Start user IDs from 1000
        const defaultImageUrl = "https://placeholdit.com/600x400/dddddd/999999?text=User%20Issue";

        const issueToAdd: Issue = {
            ...newIssue,
            id: newId,
            date: new Date().toLocaleDateString("en-GB"),
            status: "Reported",
            imageUrl: newIssue.imageUrl || defaultImageUrl,
        };

        setUserIssues((prev) => [issueToAdd, ...prev]); // prepend to keep newest first
        setNewIssue({ title: "", description: "", category: "", imageUrl: "" });
        closeDialog();
    }

    return (
        <div>
            <nav className="h-12 flex items-center px-4 justify-between">
                <div>
                    <Link href="/" className="text-2xl">
                        Civic<span className="text-red-500">Track</span>
                    </Link>
                </div>
                <div className="flex h-12 items-center gap-4">
                    <div className="hidden sm:block">
                        <ul className="flex">
                            {/* My Issues Dialog */}
                            <li>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"link"}>My Issues</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md max-h-[70vh] flex flex-col">
                                        <DialogHeader>
                                            <DialogTitle>My Reported Issues</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex-1 overflow-y-auto mt-4 space-y-4">
                                            {userIssues.length === 0 && <p>No issues reported by you yet.</p>}
                                            {userIssues.map((issue) => (
                                                <div key={issue.id} className="border rounded p-3">
                                                    <h3 className="font-semibold text-2xl">{issue.title}</h3>
                                                    <p className="text-sm my-2">{issue.description}</p>
                                                    <p className="text-xs text-muted-foreground my-2">
                                                        Category: {issue.category} {" "} | Status: {issue.status} {" "} | Date: {issue.date}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </li>

                            {/* Report New Issue Dialog */}
                            <li>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"link"}>Report New Issue</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-md max-h-[70vh] flex flex-col">
                                        <div className="flex-1 overflow-y-auto flex flex-col gap-4 mt-4 p-2">
                                            <DialogHeader>
                                                <DialogTitle>Report a New Issue</DialogTitle>
                                            </DialogHeader>

                                            <div>
                                                <Label htmlFor="title" className="my-2">Title</Label>
                                                <Input
                                                    id="title"
                                                    name="title"
                                                    value={newIssue.title}
                                                    onChange={handleChange}
                                                    placeholder="Title"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="description" className="my-2">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    value={newIssue.description}
                                                    onChange={handleChange}
                                                    placeholder="Description"
                                                    rows={4}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="category" className="my-2">Category</Label>
                                                <Select
                                                    onValueChange={(val: string) => setNewIssue((prev) => ({ ...prev, category: val }))}
                                                    value={newIssue.category}
                                                >
                                                    <SelectTrigger id="category" name="category" className="w-full">
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Roads">Roads</SelectItem>
                                                        <SelectItem value="Lighting">Lighting</SelectItem>
                                                        <SelectItem value="Cleanliness">Cleanliness</SelectItem>
                                                        <SelectItem value="Water Supply">Water Supply</SelectItem>
                                                        <SelectItem value="Garbage">Garbage</SelectItem>
                                                        <SelectItem value="Noise">Noise</SelectItem>
                                                        <SelectItem value="Traffic">Traffic</SelectItem>
                                                        <SelectItem value="Parks">Parks</SelectItem>
                                                        <SelectItem value="Public Transport">Public Transport</SelectItem>
                                                        <SelectItem value="Pollution">Pollution</SelectItem>
                                                        <SelectItem value="Street Vendors">Street Vendors</SelectItem>
                                                        <SelectItem value="Animal Control">Animal Control</SelectItem>
                                                        <SelectItem value="Drainage">Drainage</SelectItem>
                                                        <SelectItem value="Waterlogging">Waterlogging</SelectItem>
                                                        <SelectItem value="Street Signs">Street Signs</SelectItem>
                                                        <SelectItem value="Sidewalks">Sidewalks</SelectItem>
                                                        <SelectItem value="Building Safety">Building Safety</SelectItem>
                                                        <SelectItem value="Electricity">Electricity</SelectItem>
                                                        <SelectItem value="Public Toilets">Public Toilets</SelectItem>
                                                        <SelectItem value="Others">Others</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label htmlFor="imageUrl" className="my-2">Image URL (optional)</Label>
                                                <Input
                                                    id="imageUrl"
                                                    name="imageUrl"
                                                    value={newIssue.imageUrl}
                                                    onChange={handleChange}
                                                    placeholder="Image URL"
                                                />
                                            </div>
                                        </div>

                                        <DialogFooter>
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    addNewIssue(() =>
                                                        document.activeElement?.dispatchEvent(new MouseEvent("click"))
                                                    )
                                                }
                                            >
                                                Submit
                                            </Button>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </li>
                        </ul>
                    </div>

                    <div className="sm:hidden">
                        <SheetComponent />
                    </div>
                    <AvatarDropdown imageSrc="" />
                </div>
            </nav>
        </div>
    );
}
