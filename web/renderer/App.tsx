import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import type { PageContext } from './types';
import { PageContextProvider } from './usePageContext';

type Props = { children: React.ReactNode; pageContext: PageContext };

export function App(props: Props) {
    return (
        <React.StrictMode>
            <TonConnectUIProvider manifestUrl="https://secure-deal-ton.github.io/tonconnect-manifest.json">
                <PageContextProvider value={props.pageContext}>{props.children}</PageContextProvider>
            </TonConnectUIProvider>
        </React.StrictMode>
    );
}
