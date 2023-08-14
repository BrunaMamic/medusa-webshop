import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import Link from 'next/link';
import { Heading } from '@/components/ui/Heading';

const MyOrdersPage = () => {
  return (
    <div>
      <Heading className="mb-8 text-primary lg:mb-15">My orders</Heading>

      {/* <p>You haven’t order anything yet.</p> */}

      <ul className="[&>li:last-child]:mb-0 [&>li]:mb-4">
        <li className="rounded-sm border border-gray-200 p-4">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <ul>
              <li className="mb-2 text-md text-primary">
                Order: <span className="ml-1 text-black">00000000004</span>
              </li>

              <li className="text-xs text-gray-400">
                Order date:{' '}
                <span className="ml-2 text-black">29 June 2023</span>
              </li>
            </ul>

            <ul className="flex [&>li:last-child]:mr-0 [&>li]:mr-4">
              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Tag icon="package">Packing</Tag>

              <p className="text-xs2 text-gray-400">
                Estimate delivery:{' '}
                <span className="ml-1 text-black">29 June 2023</span>
              </p>
            </div>
            <Link href="/account/my-orders/order">
              <Button variant="secondary">Check status</Button>
            </Link>
          </div>
        </li>

        <li className="rounded-sm border border-gray-200 p-4">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <ul>
              <li className="mb-2 text-md text-primary">
                Order: <span className="ml-1 text-black">00000000003</span>
              </li>

              <li className="text-xs text-gray-400">
                Order date:{' '}
                <span className="ml-2 text-black">29 June 2023</span>
              </li>
            </ul>

            <ul className="flex [&>li:last-child]:mr-0 [&>li]:mr-4">
              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Tag icon="truck">Delivering</Tag>

              <p className="text-xs2 text-gray-400">
                Estimate delivery:{' '}
                <span className="ml-1 text-black">29 June 2023</span>
              </p>
            </div>

            <Button variant="secondary">Check status</Button>
          </div>
        </li>

        <li className="rounded-sm border border-gray-200 p-4">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <ul>
              <li className="mb-2 text-md text-primary">
                Order: <span className="ml-1 text-black">00000000002</span>
              </li>

              <li className="text-xs text-gray-400">
                Order date:{' '}
                <span className="ml-2 text-black">29 June 2023</span>
              </li>
            </ul>

            <ul className="flex [&>li:last-child]:mr-0 [&>li]:mr-4">
              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <Tag icon="check">Delivered</Tag>

            <Button variant="secondary">Check status</Button>
          </div>
        </li>

        <li className="rounded-sm border border-gray-200 p-4">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <ul>
              <li className="mb-2 text-md text-primary">
                Order: <span className="ml-1 text-black">00000000001</span>
              </li>

              <li className="text-xs text-gray-400">
                Order date:{' '}
                <span className="ml-2 text-black">29 June 2023</span>
              </li>
            </ul>

            <ul className="flex [&>li:last-child]:mr-0 [&>li]:mr-4">
              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>

              <li className='relative before:absolute before:flex before:h-full before:w-full before:items-center before:justify-center before:bg-black-opacity before:text-md before:text-white before:content-["+4"]'>
                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={100}
                  width={75}
                  alt="T-shirt"
                />
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <div className="flex flex-wrap items-center gap-3.5">
              <Tag icon="check">Delivered</Tag>

              <Tag variant="informative">Povrat</Tag>
            </div>

            <Button variant="secondary">Check status</Button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MyOrdersPage;
