import React from 'react';
import { Product } from './Product';
import { Heading } from './ui/Heading';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

function RelatedProducts({ products }: any) {
  return (
    <div>
      <p className="mb-4 p-4 text-gray-800">Recommended</p>

      <div className="mt-4 flex">
        {products.map((product: PricedProduct) => (
          <div
            key={product.id}
            className="col-span-12 mr-4 transform transition-transform hover:scale-110 md:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <Product
              key={product.id}
              title={product.title || ''}
              src={product.thumbnail || ''}
              height={320}
              width={480}
              alt={product.title || ''}
              linkTo={`/product/${product.handle}`}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
