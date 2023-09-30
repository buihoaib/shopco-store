"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { toast } from 'react-hot-toast';

import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";

const SIZE_IN_STOCK = "In stock and ready to ship";
const SIZE_OUT_OF_STOCK = "Out of stock";

interface ProductInfoProps {
    data: Product
};

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const selectedSizeType = searchParams.get("size") || data.sizes[0].type;
    const [selectedQuantity, setSelectedQuantity] = useState("1")
    const [availableStock, setAvailableStock] = useState(0)

    const cart = useCart();

    useEffect(() => {
        setAvailableStock(data.sizes.find((size) => size.type === selectedSizeType)!.stock)
        setSelectedQuantity("1");
    }, [selectedSizeType]);

    const onAddToCart = () => {
        const quantityInCart = cart.items.find((item) => item.id === `${data.id}-${selectedSizeType}`)?.quantity || 0;

        if (parseInt(selectedQuantity) + quantityInCart > availableStock) {
            toast.error(`Selected quantity exceeds stock.\nPlease select quantity <= ${availableStock - quantityInCart}`);
        } else {
            cart.addItem(data, selectedSizeType, parseInt(selectedQuantity));
        }
    };

    const isCurrentSizeOutOfStock = () => {
        const selectedSize: any = data.sizes.find((size) => size.type === selectedSizeType);
        if (selectedSize) {
            return !(selectedSize.stock > 0);
        }
        return true;
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-black uppercase">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-black">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />

            <div className="flex flex-col gap-y-6">
                <div className="flex flex-col items-start gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div className="flex gap-2 relative">
                        {data?.sizes?.map((size, index) => (
                            <Button
                                key={index}
                                onClick={(e) => {
                                    router.replace(`/product/${data?.id}?${new URLSearchParams({ size: size.type })}`)
                                }}
                                className={cn("border-2 flex w-12 justify-center hover:bg-transparent relative",
                                    ((size.type === selectedSizeType) && "border-black"))}
                            >
                                {size.stock === 0 ? (
                                    <span
                                        className="before:absolute before:border-[1px] before-box-content before:border-red-500 before:w-full before:-rotate-45 before:origin-bottom before:top-1/2"
                                    >
                                        <span className="relative px-4 py-2 opacity-50">{size.type}</span>
                                    </span>) :
                                    <span className="relative px-4 py-2">{size.type}</span>
                                }
                            </Button>
                        ))}
                    </div>
                    <h3
                        className={cn("font-regular ", isCurrentSizeOutOfStock() ? "text-red-500" : "text-stone-600")}
                    >
                        {isCurrentSizeOutOfStock() ? SIZE_OUT_OF_STOCK : SIZE_IN_STOCK}
                    </h3>
                </div>
                <div className="flex flex-col items-start gap-x-4">
                    <h3 className="font-semibold text-black">Quantity:</h3>
                    <Select
                        disabled={availableStock === 0}
                        value={(selectedQuantity)}
                        defaultValue={"1"}
                        onValueChange={(value) => setSelectedQuantity(value)}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue
                                placeholder="1"
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {[...Array((availableStock > 5 ? 5 : availableStock))].map((e, index) => (
                                <SelectItem
                                    key={index}
                                    value={(index + 1).toString()}
                                    className="bg-white border-b-2 last:border-b-0"
                                >
                                    {index + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div >

            <div className="mt-10 flex items-center gap-x-3">
                <Button
                    onClick={onAddToCart}
                    disabled={isCurrentSizeOutOfStock()}
                    className="flex items-center gap-x-2 rounded-full bg-black text-white"
                >
                    Add To Cart
                    <ShoppingCart size={20} />
                </Button>
            </div>
        </div >
    );
}

export default ProductInfo;
