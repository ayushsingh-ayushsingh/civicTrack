import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";

export default function SheetComponent() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost"><Menu /></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="sr-only">
                    <SheetTitle>
                        <Link href="/" className="text-3xl">
                            My-Lo<span className="text-red-500">g</span>o
                        </Link>
                    </SheetTitle>
                    <SheetDescription>
                        An application to rule them all...
                    </SheetDescription>
                </SheetHeader>
                <ul className="p-4 flex flex-col gap-6 h-full justify-center">
                    <li>
                        <Link href={"/"} className="text-4xl">Home</Link>
                    </li>
                    <li>
                        <Link href={"/about"} className="text-4xl">About</Link>
                    </li>
                    <li>
                        <Link href={"/contact"} className="text-4xl">Contact</Link>
                    </li>
                </ul>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}