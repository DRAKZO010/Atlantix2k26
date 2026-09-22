import React, { createContext, useContext } from 'react';

type ContentChangeFn = (path: string, value: string) => void;

const ContentChangeContext = createContext<ContentChangeFn>(() => {});

export const ContentChangeProvider = ContentChangeContext.Provider;
export const useContentChange = () => useContext(ContentChangeContext);
