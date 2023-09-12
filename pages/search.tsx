import * as React from 'react';
import { useEffect, useState } from 'react';
import { useCart } from 'medusa-react';
import { useRouter } from 'next/router';
import { getPriceByCurrency } from '@/utils/getPriceByCurrency';
import { Heading } from '@/components/ui/Heading';
import { Product } from '@/components/Product';
import DefaultLayout from '@/layouts/DefaultLayout';

import Medusa from '@medusajs/medusa-js';
import { MEDUSA_BACKEND_URL } from '@/lib/config';
import { NextPageWithLayout } from './_app';
const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

const ShopPage: NextPageWithLayout = () => {
  const { cart } = useCart();
  const router = useRouter();
  const { title } = router.query;

  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchTerm = router.query.title as string;

  const fetchProducts = async (searchTerm: string) => {
    try {
      const { hits } = await medusa.products.search({ q: searchTerm });
      return hits;
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm).then((data: any) => {
        setFilteredProducts(data);
      });
    }
  }, [searchTerm]);

  return (
    <>
      <main className="px-4 py-10 lg:px-24 lg:pb-39.5 lg:pt-17">
        <div className="relative mb-10 flex items-center justify-between lg:mb-19">
          <Heading size="xl6" className="text-primary">
            {title}
          </Heading>
          <span className="ml-2 text-sm text-gray-500">
            {filteredProducts.length} products
          </span>
        </div>

        <div className="grid grid-cols-12 gap-y-8 md:gap-x-12">
          {filteredProducts?.map((hit: any) => {
            if (!filteredProducts) {
              return null;
            }
            const calculatedPrice = getPriceByCurrency(
              hit?.variants?.[0]?.prices,
              cart?.region?.currency_code || '',
              1
            );

            return (
              <Product
                key={hit.objectID}
                className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                title={hit.title}
                calculatedPrice={calculatedPrice}
                discount={hit.discount}
                discountedPrice={hit.discountedPrice}
                collection={hit.collection?.handle}
                src={hit.thumbnail}
                height={3200}
                width={2400}
                alt={hit.title}
                linkTo={`/product/${hit.handle}`}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

ShopPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ShopPage;
