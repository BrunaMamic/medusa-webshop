import { Heading } from '@/components/ui/Heading';
import { Product } from '@/components/Product';
import { ShopFilter } from './filter';

const Shop = () => {
  return (
    <>
      <main className="px-4 py-10 lg:px-24 lg:pb-39.5 lg:pt-17">
        <div className="relative mb-10 flex items-center justify-between lg:mb-19">
          <Heading size="xl6" className="text-primary">
            Shop
          </Heading>

          <ShopFilter />
        </div>

        <div className="grid grid-cols-12 gap-y-8 md:gap-x-12">
          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            price={30}
            collection="fresh"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product"
          />

          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            discount={50}
            price={30}
            discountedPrice={15}
            collection="matz"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product"
          />

          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            discount={50}
            price={30}
            discountedPrice={15}
            collection="base"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product"
          />

          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            discount={50}
            price={30}
            discountedPrice={15}
            collection="fresh"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product"
          />
        </div>

        <button className="relative mx-auto mt-9 block transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2">
          There is more
        </button>
      </main>
    </>
  );
};

export default Shop;
