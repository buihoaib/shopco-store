import getProducts from '@/actions/getProducts';
import Banner from '@/components/banner'
import ProductList from '@/components/productList';

const HomeT = async () => {
    const products = await getProducts();
    // const banner = await getBanner("0e12e5cf-29ab-4529-b8d5-c5371dae1f7b");

    return (
        <div>
            All products
        </div>
    )
}

export default HomeT;
