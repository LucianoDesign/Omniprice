import ProductCard from "@/components/ProductCard";
import { getSelectedProducts } from "@/lib/actions";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";

const SelectedProducts = async () => {
  const { user } = (await getSession()) || {};

  const userId = user?.sub;
  const myProducts = await getSelectedProducts(userId);

  return (
    <>
      <section className="px-6 md:px-20 pb-12 pt-12">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="head-text">
              My selected
              <span className="text-primary"> Products</span>
            </h1>
            <p className="mt-6">Keep track of your products here.</p>
          </div>
        </div>
      </section>
      <section className="selected-section">
        <h2 className="section-text">Your searches</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {myProducts?.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default withPageAuthRequired(SelectedProducts);
