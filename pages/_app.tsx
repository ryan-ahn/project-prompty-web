/**
 * Author : Ryan
 * Date : 2023-04-01
 * Desc : _app
 */

import App, { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global';
import { wrapper } from '@libs/redux/store';
import theme from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
