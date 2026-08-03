import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from './types';
import { loadContent } from './services/content';

const ContentContext = createContext<SiteContent | null>(null);

export function useContent(): SiteContent {
  return useContext(ContentContext) || ({} as SiteContent);
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    loadContent().then(c => setContent(c));
  }, []);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4ead5]">
        <div className="bg-white p-8 comic-border-ultra shadow-comic-lg text-center space-y-4">
          <div className="font-anton text-3xl text-[#bb0013] animate-pulse">LOADING...</div>
          <p className="font-bricolage text-sm text-zinc-600">Connecting to mission control.</p>
        </div>
      </div>
    );
  }

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}
