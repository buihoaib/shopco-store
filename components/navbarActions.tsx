"use client";

import { ShoppingCart, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import useCart from "@/hooks/useCart";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();
    const cart = useCart();

    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-2">
            <Button onClick={() => router.push('/cart')} className="relative flex hover:bg-white">
                <ShoppingCart
                    size={25}
                    color="black"
                    className="mr-0.5"
                />
                <Badge variant="outline" className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-[6px] text-xs">
                    {cart.items.length}
                </Badge>
            </Button>
            {/* <Button onClick={() => router.push('/')} className="p-0 hover:bg-white">
                <UserCircle
                    size={25}
                    color="black"
                />
            </Button> */}
        </div >
    );
}

export default NavbarActions;