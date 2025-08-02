import Link from "next/link";
import AvatarDropdown from "@/components/layouts/avatar-dropdown";
import SheetComponent from "@/components/layouts/sheet-component";

export default function Navbar() {
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
                        <ul className="flex gap-4">
                            <li>
                                <Link href={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link href={"/about"}>About</Link>
                            </li>
                            <li>
                                <Link href={"/contact"}>Contact</Link>
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
