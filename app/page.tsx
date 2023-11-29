import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import { getRandomProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";



const Home = async () => {
  const allProducts = await getRandomProducts();

  return (
    <>
      <section className="px-6 md:px-20 pb-12 pt-12">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the power of
              <span className="text-primary"> OmniPrice</span>
            </h1>
            <p className="mt-6">
              Track the prices from Mercado Libre and get the best price always.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product, index) => (
            <ProductCard key={product._id} product={JSON.parse(JSON.stringify(product))}  delay={index * 0.15}/>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
