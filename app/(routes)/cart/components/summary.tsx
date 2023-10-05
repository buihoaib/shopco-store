"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";

export const revalidate = 0;

const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart((state: { items: any; }) => state.items);
    const removeAll = useCart((state: { removeAll: any; }) => state.removeAll);

    useEffect(() => {
        if (searchParams.get('success')) {
            toast.success('Payment completed.');
            removeAll();
        }

        if (searchParams.get('canceled')) {
            toast.error('Something went wrong.');
        }
    }, [searchParams, removeAll]);

    const totalPrice = items.reduce((total: number, item: { product: { price: any; }, quantity: number }) => {
        return total + (Number(item.product.price) * item.quantity)
    }, 0);

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            clientOrderItems: items.map((item: { id: string; product: any; size: string; quantity: number }) => ({
                productId: item.product.id,
                size: item.size,
                quantity: item.quantity
            }))
        });

        window.location = response.data.url;
    }

    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            <h3 className="text-lg font-medium text-gray-900">
                Order summary
            </h3>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">Order total</div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button
                onClick={onCheckout}
                disabled={items.length === 0}
                className="flex w-full mt-6 rounded-full bg-black text-white gap-2"
            >
                Checkout
                <MoveRight size={20} />
            </Button>
        </div>
    );
}

export default Summary;
