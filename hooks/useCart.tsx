import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware";

import { ClientOrderItem, Product } from '@/types';

interface CartStore {
    items: ClientOrderItem[];
    addItem: (data: Product, size: string) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product, size: string) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === `${data.id}-${size}`);

            if (existingItem) {
                const newQuantity = existingItem.quantity + 1;
                // Remove item
                set({ items: [...get().items.filter((item) => item.id !== `${data.id}-${size}`)] });
                // Create new with updated quantity
                const newItem = {
                    id: `${data.id}-${size}`,
                    product: data,
                    size,
                    quantity: newQuantity
                }
                set({ items: [newItem, ...get().items] });

                toast.success('Item updated.');
            } else {
                const newItem = {
                    id: `${data.id}-${size}`,
                    product: data,
                    size,
                    quantity: 1
                }
                set({ items: [newItem, ...get().items] });
                toast.success('Item added to cart.');
            }
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            toast.success('Item removed from cart.');
        },
        removeAll: () => set({ items: [] }),
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    }));

export default useCart;
