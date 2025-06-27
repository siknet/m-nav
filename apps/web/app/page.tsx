import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteContent } from '@/components/site-content';
import { getPageData } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export default async function Page() {
  let pageData;
  let error = null;

  try {
    pageData = await getPageData();
  } catch (err) {
    error =
      err instanceof Error ? err.message : 'Failed to load data from Notion';
    pageData = {
      title: 'Navigation',
      description: '',
      items: {},
    };
  }

  return (
    <div data-wrapper='' className='border-grid flex flex-1 flex-col min-h-svh'>
      <SiteHeader title={pageData?.title} />
      <main className='flex flex-1 flex-col container-wrapper'>
        <div className='container py-4'>
          {error && (
            <div className='p-4 mb-6 rounded-lg bg-destructive/10 text-destructive'>
              <p>Error: {error}</p>
              <p className='text-sm mt-2'>
                Make sure you have set up the NOTION_PAGE_ID
                environment variables correctly.
              </p>
            </div>
          )}

          {!error && Object.keys(pageData?.items || {}).length === 0 && (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>
                No items found in the Notion database.
              </p>
              <p className='text-sm mt-2'>
                Make sure your Notion page contains databases with the required
                properties.
              </p>
            </div>
          )}

          <SiteContent siteData={pageData.items} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
