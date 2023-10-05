
import ProductCard from '@/components/productCard';
import NoResults from '@/components/ui/noResults';

import getProducts from "@/actions/getProducts";

interface AllCategoriesPageProps {
    params: {
        categoryId: string;
    },
}

export const revalidate = 0;

const AllCategoriesPage: React.FC<AllCategoriesPageProps> = async ({
    params,
}) => {
    const products = await getProducts({
        categoryId: params.categoryId,
    });

    return (
        <div className="bg-white">
            <div className="px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-black uppercase pb-12">All products</h1>
                <div className="mt-6 lg:col-span-4 lg:mt-0">
                    {products.length === 0 && <NoResults />}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((item) => (
                            <ProductCard key={item.id} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCategoriesPage;
