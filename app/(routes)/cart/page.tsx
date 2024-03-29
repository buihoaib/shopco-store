"use client";

import { useEffect, useState } from 'react';

import useCart from '@/hooks/useCart';

import Summary from './components/summary'
import CartItem from './components/cartItem';

const CartPage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="bg-white">
            <div className="px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-black uppercase">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                    <div className="lg:col-span-7">
                        {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
                        <ul>
                            {cart.items.map((item) => (
                                <CartItem key={item.id} data={item} />
                            ))}
                        </ul>
                    </div>
                    <Summary />
                </div>
            </div>
        </div>
    )
};

export default CartPage;
