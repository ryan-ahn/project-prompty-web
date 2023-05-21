/**
 * Author : Ryan
 * Date : 2023-04-01
 * Desc : _app
 */

import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useDispatch } from 'react-redux';
import jsCookie from 'js-cookie';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@styles/global';
import { wrapper } from '@libs/redux/store';
import theme from '@styles/theme';
import { GET_TOKEN_ACCESS_REQUEST } from '@libs/redux/modules/user/actions';

function MyApp({ Component, pageProps }: AppProps) {
  // Hooks
  const dispatch = useDispatch();
  // Cookie
  const access = jsCookie.get('access');

  useEffect(() => {
    if (access) {
      dispatch({ type: GET_TOKEN_ACCESS_REQUEST });
    }
  }, [access]);

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
