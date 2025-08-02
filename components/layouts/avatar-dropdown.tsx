import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { User2Icon } from "lucide-react";

export default function AvatarDropdown({ imageSrc = "" }: { imageSrc: string }) {
    return (
        <div className="cursor-pointer">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {
                        imageSrc ?
                            <Image
                                src={imageSrc}
                                alt="Avatar"
                                width={512}
                                height={512}
                                className="h-8 w-8 object-cover rounded-full"
                            /> :
                            <div className="bg-accent border-2 rounded-full h-8 w-8 flex items-center justify-center">
                                <User2Icon
                                    className="h-6 w-6 text-foreground"
                                />
                            </div>
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <Link href="/profile">
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        {/* <SignOut /> */}
                        <Link href="/login">
                            SignOut
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
