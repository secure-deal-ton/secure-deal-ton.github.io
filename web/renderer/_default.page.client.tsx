import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { App } from './App';
import { store, persistor } from '../store.client';
import type { PageContextClient } from './types';

export async function render(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

    hydrateRoot(
        document.getElementById('app')!,
        <App pageContext={pageContext}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Page {...pageProps} />
                </PersistGate>
            </Provider>
        </App>
    );
}

export const clientRouting = true;
