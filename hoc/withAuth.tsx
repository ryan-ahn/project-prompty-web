/**
 * Author : Ryan
 * Date : 2023-05-21
 * Desc : withAuth
 */

import { useRouter } from 'next/router';
import jscookie from 'js-cookie';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    // Hooks
    const router = useRouter();

    useEffect(() => {
      const accessToken = jscookie.get('access');
      if (!accessToken) {
        router.replace('/signin');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
