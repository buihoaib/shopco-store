import Link from "next/link";

import NavbarActions from "@/components/navbarActions";
import MainNav from "@/components/mainNav";
import getCategories from "@/actions/getCategories";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    return (
        <div className="sticky top-0 z-10 bg-white px-5 border-b-2">
            <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                    <p className="font-bold text-xl">SHOP.CO</p>
                </Link>
                <MainNav data={categories} />
                <NavbarActions />
            </div>
        </div>
    );
};

export default Navbar;
