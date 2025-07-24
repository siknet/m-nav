import { getPageData } from '@/lib/notion';
import { SiteContentClient } from './site-content-client';

export const SiteContent = async () => {
  const siteData = await getPageData();

  return <SiteContentClient siteData={siteData} />;
};
