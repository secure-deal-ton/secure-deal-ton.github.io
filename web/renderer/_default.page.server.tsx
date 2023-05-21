import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { App } from './App';
import { store } from '../store';
import type { PageContextServer } from './types';

export const passToClient = ['pageProps'];

export async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;
    if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');
    const pageHtml = ReactDOMServer.renderToString(
        <App pageContext={pageContext} store={store} persistor={null}>
            <Page {...pageProps} />
        </App>
    );
    const helmet = Helmet.renderStatic();

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html ${dangerouslySkipEscape(helmet.htmlAttributes.toString())}>
      <head>
        ${dangerouslySkipEscape(helmet.title.toString())}
        ${dangerouslySkipEscape(helmet.meta.toString())}
        ${dangerouslySkipEscape(helmet.link.toString())}
      </head>
      <body ${dangerouslySkipEscape(helmet.bodyAttributes.toString())}>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {},
    };
}
