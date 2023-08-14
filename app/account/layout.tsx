import { Sidebar } from '@/app/account/sidebar';
import DefaultLayout from '@/layouts/DefaultLayout';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DefaultLayout>
      <main className="lg:flex lg:pr-20 xl:pr-39">
        <Sidebar />

        <div className="w-full max-w-7xl px-4 py-10 lg:pb-16 lg:pl-20 lg:pr-0 lg:pt-23 xl:pl-39">
          {children}
        </div>
      </main>
    </DefaultLayout>
  );
};

export default AccountLayout;
