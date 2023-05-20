import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import type { PageContext } from './types';
import { PageContextProvider } from './usePageContext';

type Props = { children: React.ReactNode; pageContext: PageContext };

export function App(props: Props) {
    return (
        <React.StrictMode>
            <Helmet>
                <html lang="en" />
                <title>Secure Deal TON</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Secure Deal TON" />
                <link rel="icon" type="image/png" href="/logo_180.png" />
                <link rel="icon" type="image/svg+xml" href="/logotype.svg" />
            </Helmet>
            <Provider store={store}>
                <TonConnectUIProvider manifestUrl="https://secure-deal-ton.github.io/tonconnect-manifest.json">
                    <PageContextProvider value={props.pageContext}>{props.children}</PageContextProvider>
                </TonConnectUIProvider>
            </Provider>
        </React.StrictMode>
    );
}
