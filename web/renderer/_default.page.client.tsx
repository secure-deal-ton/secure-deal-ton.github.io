import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import type { PageContextClient } from './types';

export async function render(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

    hydrateRoot(
        document.getElementById('app')!,
        <App pageContext={pageContext}>
            <Page {...pageProps} />
        </App>
    );
}

export const clientRouting = true;
