import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@m-nav/ui/components/card';
import { Button } from '@m-nav/ui/components/button';
import { ArrowUpRightIcon } from 'lucide-react';

export function SiteCard({
  title,
  description,
  href,
  category,
}: {
  title: string;
  description: string;
  href: string;
  category: string;
}) {
  return (
    <Card className='group hover:shadow-md transition-shadow rounded-sm shadow-none'>
      <CardHeader>
        <CardTitle className='flex items-center flex-row justify-between'>
          <div className='flex items-center flex-row gap-2'>
            <Image
              src={`/favicon/${new URL(href || '').hostname}?larger=true`}
              alt={title}
              width={20}
              height={20}
              className=' object-cover overflow-hidden'
            />
            <span>{title}</span>
          </div>

          <Link
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='block'
          >
            <Button
              variant='ghost'
              size='icon'
              className='opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <ArrowUpRightIcon className='w-4 h-4' />
            </Button>
          </Link>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
