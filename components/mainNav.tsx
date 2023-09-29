"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { Category } from "@/types";

interface MainNavProps {
    data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => {
    const pathname = usePathname();

    const routes = data.map((route) => ({
        href: `/categories/${route.id}`,
        label: route.name,
        active: pathname === `/categories/${route.id}`,
    }));

    const shopAllRoute = {
        href: `/product`,
        label: 'Shop All',
        active: pathname === `/product`,
    }

    return (
        <nav
            className="mx-6 flex items-center space-x-4 lg:space-x-6"
        >
            <Link
                key={shopAllRoute.href}
                href={shopAllRoute.href}
                className={cn(
                    'text-sm font-medium transition-colors hover:text-black',
                    shopAllRoute.active ? 'text-black' : 'text-neutral-500'
                )}
            >
                {shopAllRoute.label}
            </Link>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-black',
                        route.active ? 'text-black' : 'text-neutral-500'
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
};

export default MainNav;
