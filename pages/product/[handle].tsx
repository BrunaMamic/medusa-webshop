import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { QuantityInput } from '@/components/ui/QuantityInput';
import { useCart, useProducts } from 'medusa-react';
import { useStore } from '@/lib/context/store-context';
import { getPriceByCurrency } from '@/utils/getPriceByCurrency';
import algoliarecommend from '@algolia/recommend';
import { Product } from '@/components/Product';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import RelatedProducts from '@/components/RelatedProducts';

import { useNotification } from '@/lib/context/notification-context';

const ProductSinglePage = ({ product }: any) => {
  const { cart } = useCart();
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState('');
  const { products, isLoading } = useProducts({
    cart_id: cart?.id,
    handle: router.query.handle as string,
    sales_channel_id: ['sc_01H7T59WCYF8353JA6SX6RQ1P7'],
  });
  console.log(products);

  const [uniqueColors, setUniqueColors] = useState<any>([]);
  const [uniqueSize, setUniqueSize] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState({
    color: uniqueColors[0] || '',
    size: '',
    quantity: 1,
  });
  const [matchingVariants, setMatchingVariants] = useState<any>([]);
  const [isAddToCartEnabled, setIsAddToCartEnabled] = useState(false);

  const showNotification = useNotification();

  //CART
  const store = useStore();
  const addItem = () => {
    const matchingVariant = getVariant(
      selectedOptions.color,
      selectedOptions.size
    );
    if (matchingVariant?.id) {
      store.addItem({
        variantId: matchingVariant?.id as string,
        quantity: selectedOptions.quantity,
      });
      showNotification(
        `Added ${selectedOptions.quantity}x ${products?.[0].title} to cart!`,
        'success'
      );
    }
  };

  //PRODUCT DATA

  const cartCurrencyCode = cart?.region?.currency_code || '';

  const calculatedPrice = getPriceByCurrency(
    products?.[0].variants[0].prices,
    cartCurrencyCode,
    selectedOptions.quantity
  );

  useEffect(() => {
    const colors = Array.from(
      new Set(
        products?.[0]?.options
          ?.find((option: any) => option.title === 'Color')
          ?.values.map((color: any) => color.value)
      )
    );
    setUniqueColors(colors);

    if (colors.length > 0) {
      setSelectedOptions({
        ...selectedOptions,
        color: colors[0],
      });
      handleColorChange(colors[0]);
    }

    const sizes = Array.from(
      new Set(
        products?.[0]?.options
          ?.find((option: any) => option.title === 'Size')
          ?.values.map((size: any) => size.value)
      )
    );
    setUniqueSize(sizes);
  }, [products, cart]);

  const handleColorChange = (colorValue: string) => {
    const updatedOptions = {
      ...selectedOptions,
      color: colorValue,
    };
    setSelectedOptions(updatedOptions);

    const colorOption = products?.[0].options?.find(
      (option: any) => option.title === 'Color'
    );

    const matchingVariants = products?.[0].variants.filter((variant: any) => {
      return variant.options.some((option: any) => {
        return (
          option.option_id === colorOption?.id && option.value === colorValue
        );
      });
    });
    setMatchingVariants(matchingVariants);
  };

  const handleSizeChange = (sizeValue: string) => {
    setIsAddToCartEnabled(true);

    const updatedOptions = {
      ...selectedOptions,
      size: sizeValue,
    };
    setSelectedOptions(updatedOptions);
  };

  const getVariant = (colorValue: string, sizeValue: string) => {
    return products?.[0].variants.find((x: any) => {
      const colorOption = x.options.find((op: any) => op.value === colorValue);
      const sizeOption = x.options.find((op: any) => op.value === sizeValue);

      return colorOption && sizeOption;
    });
  };

  const [relatedProducts, setRelatedProducts] = useState([]);
  console.log(relatedProducts);

  const algoliaClient = algoliarecommend(
    '2L5TYYBU6R',
    'a2e63622dcbc6590e64f68049796773a'
  );

  const fetchRelatedProducts = async () => {
    try {
      const results = await algoliaClient.getRelatedProducts([
        {
          indexName: 'products',
          objectID: products?.[0].id || '',
        },
      ]);
      setRelatedProducts(results.results[0].hits as any);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  useEffect(() => {
    if (products) {
      fetchRelatedProducts();
    }
  }, [products]);

  return products?.[0] ? (
    <main className="group flex grid-cols-12 flex-col-reverse px-4 py-8 sm:px-24 lg:grid lg:pb-36 lg:pl-0 lg:pt-15 xl:pl-24">
      <div className="col-span-6 mt-20 lg:mt-20">
        {products[0].images?.map((image: any, index: number) => (
          <Image
            key={index}
            src={image.url}
            height={3200}
            width={3200}
            alt={products[0].title || ''}
          />
        ))}
      </div>

      <div className="col-span-6 lg:ml-27">
        <Heading size="xl3" className="mb-3 text-primary">
          {products[0].title}
        </Heading>

        {/* <Tag variant="discount" className="mb-4">
          -50%
        </Tag> */}

        {(
          <p className="text-xl text-red-900">{cartCurrencyCode === 'eur' ? '€' : '$'} {(products[0].variants[0]?.calculated_price! / 100).toFixed(2) }</p>
        )}

        <p className="mt-2 text-lg text-gray-400 line-through">
          {calculatedPrice}
        </p>

        

        <ul className="my-12 [&>li:last-child]:mb-0 [&>li]:mb-3.5">
          {products[0].description}
        </ul>

        <p>Colors:</p>
        <div className="m-3 flex">
          {uniqueColors.map((colorValue: string, colorIndex: number) => (
            <button
              key={colorIndex}
              className={`mr-3 cursor-pointer border border-gray-200 px-3 py-2 ${
                colorValue === selectedOptions.color ? 'bg-gray-50' : ''
              }`}
              // "flex items-center gap-2"
              onClick={() => handleColorChange(colorValue)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="28"
                fill={colorValue === 'Blue' ? '#1a0cb3' : '#FFFFFF'}
              >
                <path
                  fill={colorValue === 'Blue' ? '#1a0cb3' : '#E0E0E0'}
                  fillRule="evenodd"
                  d="M21.57 4.8c1.447.677 2.201 1.723 2.421 3.077.126.708.095 1.538-.031 2.43-.157.924-.44 1.693-.786 2.308-.723 1.231-1.792 1.846-3.175 2.154 2.17.462 2.515 1.6 2.043 4.246l-.063.277-.66 3.631-.188 1.016h-8.173l.22-1.324.598-3.261c.014-.083.021-.16.029-.23.008-.087.016-.164.034-.232.094-.83-.095-.892-.598-.892l-1.069 5.939H4L7.552 4h9.304c.849 0 1.666.062 2.357.154.943.123 1.73.338 2.358.646Zm-6.537 7.446c.22-.154.377-.461.471-.923.095-.37.032-.708-.157-.862a.55.55 0 0 0-.408-.153h-.346l-.377 2.092h.377a.761.761 0 0 0 .44-.154ZM37.099 23.94H21.917L25.469 4H40.65l-1.195 6.646h-7.198l-.125.585h7.23l-.944 5.23h-7.198l-.126.616h7.199l-1.195 6.861ZM41.404 4h8.33c5.878 0 8.424 2.8 7.45 8.277l-.692 3.846c-.314 1.754-.786 3.17-1.477 4.37-1.32 2.307-3.646 3.446-7.89 3.446h-9.273L41.404 4Zm7.01 6.4-1.195 6.892h.032c.597 0 .786-.154.974-1.261l.786-4.462c.189-.984.126-1.169-.534-1.169h-.063Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ))}
        </div>

        <p className="mb-4">Size</p>
        <div className="m-3 flex">
          {uniqueSize.map((sizeValue: string, sizeIndex: number) => {
            const isAvailableForSelectedColor = matchingVariants.some(
              (variant: any) =>
                variant.options.some(
                  (option: any) => option.value === sizeValue
                )
            );
            return (
              <button
                key={sizeIndex}
                className={`m-2 cursor-pointer border border-gray-200 px-3 py-2 ${
                  sizeValue === selectedOptions.size
                    ? 'bg-gray-100 font-black text-primary'
                    : isAvailableForSelectedColor
                    ? 'transition-all hover:border-primary hover:font-black hover:text-primary'
                    : 'pointer-events-none text-gray-100'
                }`}
                onClick={() => handleSizeChange(sizeValue)}
              >
                {sizeValue}
              </button>
            );
          })}
        </div>

        <p className="mb-2">Quantity</p>

        <QuantityInput
          onChange={(val) => {
            setSelectedOptions({
              ...selectedOptions,
              quantity: val,
            });
          }}
          defaultValue={1}
          maxValue={20}
          variant="secondary"
          className="mb-8"
        />

        <Button
          size="lg"
          className="m-4 w-full"
          onPress={() => addItem()}
          isDisabled={!isAddToCartEnabled}
        >
          ADD
        </Button>

        {/* <p className="text-gray-300">Estimate delivery 2-3 days</p> */}
        <div className="mt-4 lg:mt-0 lg:flex lg:flex-col">
          <div className="lg:hidden"></div>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </main>
  ) : null;
};

ProductSinglePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ProductSinglePage;
