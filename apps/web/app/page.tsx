import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getPageData } from '@/lib/notion';

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
                Make sure you have set up the NOTION_TOKEN and NOTION_PAGE_ID
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

          {Object.keys(pageData?.items || {}).map((type) => (
            <div key={type} className='mb-8'>
              <h2 className='text-xl font-semibold mb-4 capitalize'>{type}</h2>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {pageData?.items?.[type]?.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block p-4 rounded-sm border bg-card text-card-foreground hover:shadow-md transition-shadow'
                  >
                    <h3 className='font-medium mb-2'>{item.title}</h3>
                    {item.description && (
                      <p className='text-sm text-muted-foreground'>
                        {item.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
