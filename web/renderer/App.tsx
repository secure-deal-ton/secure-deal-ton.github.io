import React from 'react';
import type { PageContext } from './types';
import { PageContextProvider } from './usePageContext';

type Props = { children: React.ReactNode; pageContext: PageContext };

export function App(props: Props) {
    return (
        <React.StrictMode>
            <PageContextProvider value={props.pageContext}>{props.children}</PageContextProvider>
        </React.StrictMode>
    );
}
