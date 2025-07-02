import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteContent } from '@/components/site-content';
import { Suspense } from 'react';
import { GridSkeleton } from '@/components/GridSkeleton';
import { getPageData } from '@/lib/notion';

export default async function Page() {
  // 获取站点数据，在整个页面中共享使用
  const siteData = await getPageData();
  
  return (
    <div data-wrapper='' className='border-grid flex flex-1 flex-col min-h-svh'>
      <SiteHeader title={siteData.title} />
      <main className='flex flex-1 flex-col container-wrapper p-4'>
        <Suspense fallback={<GridSkeleton />}>
          <SiteContent siteData={siteData} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
