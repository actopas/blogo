/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 14:42:08
 */
// import { BackToTop } from '@/components/back-to-top';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

export const revalidate = 60;
export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-190px)]">{children}</main>
      <Footer />
      {/* <BackToTop /> */}
    </>
  );
}
