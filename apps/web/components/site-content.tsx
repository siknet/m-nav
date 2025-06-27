import { DatabaseItem } from '@/lib/notion';
import { SiteCard } from './site-card';

export const SiteContent = ({
  siteData,
}: {
  siteData: Record<string, DatabaseItem[]>;
}) => {
  return Object.keys(siteData || {}).map((type) => (
    <div key={type} className='mb-8'>
      <h2 className='text-xl font-semibold mb-4 capitalize'>{type}</h2>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {siteData?.[type]?.map((item) => (
          <SiteCard
            key={item.id}
            title={item.title}
            description={item.description || ''}
            href={item.link}
            category={type}
          />
        ))}
      </div>
    </div>
  ));
};
