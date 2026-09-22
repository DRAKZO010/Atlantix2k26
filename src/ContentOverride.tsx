import React, { createContext, useContext } from 'react';
import { SiteContent } from './types';

const ContentOverrideContext = createContext<SiteContent | null>(null);

export const ContentOverrideProvider: React.FC<{ value: SiteContent; children: React.ReactNode }> = ({ value, children }) => (
  <ContentOverrideContext.Provider value={value}>
    {children}
  </ContentOverrideContext.Provider>
);

export const useContentOverride = () => useContext(ContentOverrideContext);
