'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useSiteTitle } from '@/components/site-title-context';
import { Skeleton } from '@m-nav/ui/components/skeleton';

export function MainNav({ title }: { title?: string }) {
  const { title: contextTitle } = useSiteTitle();
  
  // 优先使用传入的 title，否则使用 context 中的动态标题
  const displayTitle = title || contextTitle;

  return (
    <div className='flex'>
      <Link href='/' className='mr-4 flex items-center gap-2 lg:mr-6'>
        <Logo className='size-6 rounded-sm' />
        <span className='font-bold'>
          {displayTitle || <Skeleton className="h-6 w-24" />}
        </span>
      </Link>
    </div>
  );
}
