import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import IconButton from "@/components/ui/iconButton";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/useCart";
import { ClientOrderItem, Product } from "@/types";

interface CartItemProps {
    data: ClientOrderItem;
}

const CartItem: React.FC<CartItemProps> = ({
    data
}) => {
    const router = useRouter();
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.id);
    };

    const handleClick = () => {
        router.push(`/product/${data?.product?.id}` + `?` + `size=${data.size}`);
    };

    return (
        <li className="flex py-6 border-b">
            <div onClick={handleClick} className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 cursor-pointer">
                <Image
                    fill
                    src={data.product.images[0].url}
                    alt=""
                    className="object-cover object-center"
                />
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} />} />
                </div>
                <div className="relative flex flex-col pr-9 sm:gap-x-6 sm:pr-0 gap-y-1">
                    <div onClick={handleClick} className="flex justify-between cursor-pointer">
                        <p className=" text-lg font-semibold text-black">
                            {data.product.name}
                        </p>
                    </div>

                    <div className="flex text-sm">
                        {/* <p className="text-gray-500">{data.color.name}</p>
                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.size.name}</p> */}
                        <p className="text-gray-500">Size:
                            <span className="text-gray-500">{` ${data.size}`}</span>
                        </p>
                    </div>

                    <div className="flex text-sm">
                        {/* <p className="text-gray-500">{data.color.name}</p>
                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{data.size.name}</p> */}
                        <p className="text-gray-500">Quantity:
                            <span className="text-gray-500"> {` ${data.quantity}`}</span>
                        </p>
                    </div>

                    <Currency value={data.product.price} />
                </div>
            </div>
        </li>
    );
}

export default CartItem;
