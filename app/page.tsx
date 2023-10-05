import getProducts from '@/actions/getProducts';
import Banner from '@/components/banner'
import ProductList from '@/components/productList';

export const revalidate = 0;

const Home = async () => {
  const products = await getProducts({ isFeatured: true });

  return (
    <div>
      <Banner />
      <div className="flex flex-col gap-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </div>
  )
}

export default Home;
