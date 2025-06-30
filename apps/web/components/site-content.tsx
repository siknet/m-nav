import { getPageData } from '@/lib/notion';
import { unstable_noStore as noStore } from 'next/cache';
import { SiteContentClient } from './site-content-client';

export const SiteContent = async () => {
  noStore();
  const siteData = await getPageData();

  return <SiteContentClient siteData={siteData} />;
};
