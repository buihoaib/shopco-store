import getProducts from '@/actions/getProducts';
import Banner from '@/components/banner'
import ProductList from '@/components/productList';

const Home = async () => {
  const products = await getProducts();
  // const banner = await getBanner("0e12e5cf-29ab-4529-b8d5-c5371dae1f7b");

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
