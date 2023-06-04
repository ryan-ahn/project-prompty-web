/**
 * Author : Ryan
 * Date : 2023-04-01
 * Desc : _document
 */

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          {/* icons */}
          <link rel="shortcut icon" href="/static/logo.png" />
          <link rel="apple-touch-icon" sizes="196x196" href="/static/logo.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/logo.png" />
          {/* font */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="7DjeWBjb0IBf0iAMjq_k-uhg1i96SG06nWGfwYTc2sU"
          />
          <script src="https://accounts.google.com/gsi/client" async defer></script>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          />
          <script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
            integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
            crossOrigin="anonymous"
          ></script>
          <Script
            id=""
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              Kakao.init('96c9555bb9f1d42cab8918a469a29964');
              `,
            }}
          />
          <Script
            id="GA4"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
            `,
            }}
          />
          <Script
            id="GTM"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_ID}')
              `,
            }}
          />
          {/* <Script
            id="GPT"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              var source = new EventSource("http://localhost:8080/v1/gpt/test");
              source.onmessage = function(event) {
                  document.getElementById("result").innerHTML += event.data + "";
              };
              `,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="result"></div>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        </body>
      </Html>
    );
  }
}
