import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from './types';
import { loadContent } from './services/content';
import { useContentOverride } from './ContentOverride';

interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
}

const ContentContext = createContext<ContentContextValue>({
  content: {} as SiteContent,
  loading: true,
});

export const useContent = () => {
  const override = useContentOverride();
  const ctx = useContext(ContentContext);
  return override ? { content: override, loading: false } : ctx;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>({} as SiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent().then((c) => {
      setContent(c);
      setLoading(false);
    });
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  );
};
