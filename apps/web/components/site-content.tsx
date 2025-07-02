import { PageData } from '@/lib/notion';
import { unstable_noStore as noStore } from 'next/cache';
import { SiteContentClient } from './site-content-client';

interface SiteContentProps {
  siteData: PageData;
}

export const SiteContent = ({ siteData }: SiteContentProps) => {
  noStore();

  return <SiteContentClient siteData={siteData} />;
};
