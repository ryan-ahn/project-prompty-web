/**
 * Author : Ryan
 * Date : 2023-04-01
 * Desc : _app
 */

import App, { AppContext, AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global';
import { wrapper } from '@libs/redux/store';
import theme from '@styles/theme';
import awsExoprts from '../src/aws-exports';
import MobileLayout from '@components/layout/Mobile';
import DesktopLayout from '@components/layout/Desktop';
import { useCallback } from 'react';
Amplify.configure(awsExoprts);

function MyApp({ Component, pageProps }: AppProps) {
  const renderLayout = useCallback(() => {
    switch (pageProps.userDevice) {
      case 'mobile':
        return (
          <MobileLayout>
            <Component {...pageProps} />
          </MobileLayout>
        );
      case 'desktop':
        return (
          <DesktopLayout>
            <Component {...pageProps} />
          </DesktopLayout>
        );
    }
  }, [pageProps]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{renderLayout()}</ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  //pathName
  const pathName = appContext.ctx.pathname;
  appProps.pageProps.pathName = pathName;

  //userAgent
  const userAgent = appContext.ctx.req
    ? appContext.ctx.req?.headers['user-agent']
    : navigator.userAgent;

  //Check Device
  const mobile = userAgent?.indexOf('Mobi');
  const OS = userAgent?.match(/iPhone|iPad|iPod/i);
  appProps.pageProps.userDevice = mobile !== -1 ? 'mobile' : 'desktop';
  appProps.pageProps.userOS = OS !== null ? 'ios' : 'android';

  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
