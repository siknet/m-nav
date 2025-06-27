import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteContent } from '@/components/site-content';
import { Suspense } from 'react';
import { GridSkeleton } from '@/components/GridSkeleton';

export default async function Page() {
  return (
    <div data-wrapper='' className='border-grid flex flex-1 flex-col min-h-svh'>
      <SiteHeader />
      <main className='flex flex-1 flex-col container-wrapper p-4'>
        <Suspense fallback={<GridSkeleton />}>
          <SiteContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
