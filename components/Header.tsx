'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from '@/utils/classNames';
import { Icon, BadgeIcon } from '@/components/ui/Icon';
import { useCart } from 'medusa-react';

export interface HeaderProps {
  isAbsolute?: boolean;
  colorScheme?: 'primary' | 'inverted';
}

export const Header: React.FC<HeaderProps> = ({
  isAbsolute = false,
  colorScheme = 'primary',
}) => {
  const pathName = usePathname();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = React.useState(false);
  const {cart} = useCart()

  console.log(cart)

  return (
    <>
      <div
        className={classNames(
          'flex h-21 items-center justify-between bg-white px-4 lg:px-24',
          colorScheme === 'primary' && 'border-b border-b-primary',
          colorScheme === 'inverted' && '!bg-transparent text-white',
          isAbsolute && 'absolute left-0 right-0 top-0 z-site-header'
        )}
      >
        <div className="flex items-center">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="36"
              viewBox="0 0 95 36"
              className={classNames('w-15.5 md:w-auto', {
                'text-blue-700': colorScheme === 'primary',
                'text-gray-10': colorScheme === 'inverted',
              })}
              fill="none"
            >
              <path
                fill="currentcolor"
                d="M58.596 36h-26.75L38.104.11h26.75L62.75 12.073H50.067l-.221 1.053h12.738l-1.661 9.415H48.24l-.222 1.108h12.683l-2.105 12.35ZM66.184.11h14.677c10.357 0 14.843 5.04 13.126 14.899l-1.218 6.923c-.554 3.157-1.385 5.705-2.603 7.865C87.84 33.95 83.74 36 76.264 36H59.926L66.184.11Zm12.351 11.52L76.43 24.036h.056c1.052 0 1.384-.276 1.717-2.27l1.384-8.031c.333-1.772.222-2.105-.941-2.105h-.111ZM35.502 7.089c-.388-2.437-1.717-4.32-4.265-5.539C30.13.997 28.745.61 27.084.387A31.326 31.326 0 0 0 22.93.11H6.536L.277 36h14.4l1.883-10.69c.887 0 1.219.111 1.053 1.607-.056.221-.056.498-.111.83l-1.052 5.871L16.062 36h14.4l.332-1.828 1.163-6.535.111-.499c.83-4.763.222-6.812-3.6-7.643 2.437-.554 4.32-1.662 5.594-3.877.61-1.108 1.108-2.492 1.385-4.154.221-1.606.276-3.101.055-4.375Zm-14.954 6.203c-.166.83-.443 1.385-.83 1.661a1.323 1.323 0 0 1-.776.277h-.665l.665-3.766h.61c.332 0 .553.111.72.277.332.277.442.886.276 1.55Z"
              />
            </svg>
          </Link>

          <ul className="ml-30 hidden text-sm md:flex [&>li:last-child]:mr-0 [&>li]:mr-8">
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>

        <Link href="/cart" className="ml-auto mr-8 md:hidden">
          <BadgeIcon icon="bag" value={10} />
        </Link>

        <button
          onClick={() => setIsOffcanvasOpen((prev) => !prev)}
          className="box-content flex h-[0.9rem] w-5 origin-center transform flex-col items-center justify-between overflow-hidden p-[0.3rem] transition-all duration-200 md:hidden"
        >
          <span
            className={classNames(
              'h-0.5 w-5 origin-left transform bg-black transition-all duration-300',
              { 'bg-white': pathName === '/' || pathName === '/about' },
              { '!w-[1.0625rem] rotate-45': isOffcanvasOpen }
            )}
          ></span>
          <span
            className={classNames(
              'h-0.5 w-5 transform bg-black transition-all duration-300',
              { 'bg-white': pathName === '/' || pathName === '/about' },
              { 'w-0 opacity-0': isOffcanvasOpen }
            )}
          ></span>
          <span
            className={classNames(
              'h-0.5 w-5 origin-left transform bg-black transition-all duration-300',
              { 'bg-white': pathName === '/' || pathName === '/about' },
              {
                '!w-[1.0625rem] -rotate-45': isOffcanvasOpen,
              }
            )}
          ></span>
        </button>

        <ul className="hidden md:flex [&>li:last-child]:mr-0 [&>li]:mr-8 [&>li]:cursor-pointer">
          <li>
            <Icon name="search" />
          </li>
          <li>
            <ul className="flex uppercase">
              <li
                className={classNames(
                  'border-r-[0.0938rem] border-gray-900 pr-[0.5625rem]',
                  { 'border-white': colorScheme === 'inverted' }
                )}
              >
                HR
              </li>
              <li className="pl-2">EUR</li>
            </ul>
          </li>
          <li>
            <Link href="/my-account/login">
              <BadgeIcon icon="user" value={10} />
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <BadgeIcon icon="bag" value={10} />
            </Link>
          </li>
        </ul>
      </div>

      <div
        className={classNames(
          'invisible fixed left-0 top-0 z-site-header flex h-screen w-full -translate-x-4 text-white opacity-0 transition-all',
          { '!visible translate-x-0 !opacity-100': isOffcanvasOpen }
        )}
        style={{ width: 'calc(100vw - 62px)' }}
      >
        <div className="relative w-full bg-primary pb-8">
          <div className="relative flex h-21 items-center gap-4 border-b border-white px-4">
            <button>
              <Icon name="search" />
            </button>

            <input
              type="text"
              className="w-full bg-transparent px-1 py-1 text-white placeholder:text-white focus-visible:outline-0"
              placeholder="Search"
            />
          </div>
          <ul className="mt-8 flex flex-col gap-8 px-4 text-xl">
            <li>
              <Link href="/shop" onClick={() => setIsOffcanvasOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsOffcanvasOpen(false)}>
                About
              </Link>
            </li>
          </ul>

          <ul className="absolute bottom-8 left-0 flex w-full flex-wrap-reverse justify-between gap-4 px-4">
            <li>
              <Link
                href="/my-account/login"
                onClick={() => setIsOffcanvasOpen(false)}
              >
                My account
              </Link>
            </li>
            <li>
              <ul className="flex uppercase">
                <li className="border-r-[0.0938rem] border-white pr-[0.5625rem]">
                  HR
                </li>
                <li className="pl-2">EUR</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
