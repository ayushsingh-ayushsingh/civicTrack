import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Main() {
    return (
        <main className="p-4 min-h-[100vh] w-full justify-center">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="col-span-1 border p-4 rounded-lg">
                    <div>
                        <Image src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.wallpapersafari.com%2F44%2F55%2Fkp50Ri.jpg&f=1&nofb=1&ipt=134bd1581df3a361f0e0f72efc9c4a43623089372cf518001e812a04511d52a7"} alt="Issue Image" width={512} height={512} className="rounded-sm" />
                    </div>
                    <div className="flex w-full text-xs justify-between mt-2 text-accent-foreground/80">
                        <span>Streetlight</span>
                        <div className="flex items-center gap-2">
                            <span>In Progress</span>
                            <span>14/8/2025</span>
                        </div>
                    </div>
                    <div className="mt-2 text-lg">
                        Streetlight not working
                    </div>
                    <div className="mt-2 text-sm text-accent-foreground">
                        Streetlight is not working since last 2 days
                    </div>
                </div>
            </div>
            <PaginationDemo />
        </main>
    );
}

export function PaginationDemo() {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
