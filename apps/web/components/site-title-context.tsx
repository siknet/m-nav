'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { siteConfig } from '@/config/site';

interface SiteTitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const SiteTitleContext = createContext<SiteTitleContextType>({
  title: siteConfig.name,
  setTitle: () => {},
});

export function SiteTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState(siteConfig.name);

  // 更新浏览器标题
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <SiteTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </SiteTitleContext.Provider>
  );
}

export const useSiteTitle = () => useContext(SiteTitleContext); 