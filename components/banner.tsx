import { Button } from "./ui/button";

const Banner = () => {
    return (
        <div className="overflow-hidden">
            <div
                className={"bg-[url('/banner.png')] h-[700px] max-w-full relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center bg-opacity-75"}
            >
                <div className="absolute inset-0 w-full h-full z-8 bg-stone-100 bg-opacity-10"></div>
                <div className="mx-10 my-auto py-10 flex flex-col w-1/2 h-full justify-center items-start gap-6">
                    <h2 className="text-5xl font-bold text-black uppercase">
                        Find clothes that matches your style
                    </h2>
                    <p className="w-2/3 font-thin text-stone-200">
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>
                    <Button
                        //onClick={onAddToCart}
                        className="flex items-center gap-x-2 rounded-full bg-black text-white px-14"
                    >
                        Shop Now
                    </Button>
                </div>
            </div>
        </div >
    )
};

export default Banner;
