/**
 * Author : Ryan
 * Date : 2023-04-01
 * Desc : _document
 */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* icons */}
        <link rel="shortcut icon" href="/static/icons/common/favicon.png" />
        <link rel="apple-touch-icon" sizes="196x196" href="/static/icons/common/favicon196.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/common/favicon32.png" />
        {/* font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
