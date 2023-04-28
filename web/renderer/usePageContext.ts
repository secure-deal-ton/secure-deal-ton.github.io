import React, { useContext } from 'react';
import type { PageContext } from './types';

const Context = React.createContext<PageContext>(undefined as any);

export const PageContextProvider = Context.Provider;

export function usePageContext() {
    const pageContext = useContext(Context);
    return pageContext;
}
