import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { App } from './App';
import type { PageContextServer } from './types';

export async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;
    if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');
    const pageHtml = ReactDOMServer.renderToString(
        <App pageContext={pageContext}>
            <Page {...pageProps} />
        </App>
    );

    // See https://vite-plugin-ssr.com/head
    const { documentProps } = pageContext.exports;
    const title = (documentProps && documentProps.title) || 'Secure Deal TON';
    const desc = (documentProps && documentProps.description) || 'Secure Deal TON';

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {},
    };
}
