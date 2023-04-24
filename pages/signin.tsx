/**
 * Author : Ryan
 * Date : 2023-04-23
 * Desc : signin
 */

import { META_COMMON, META_PAGE } from '@common/meta';
import SEO from '@components/seo';
import SignIn from '@containers/signin';

export default function SignInPage() {
  // Value
  const meta = {
    page_title: META_PAGE.signin.page_title,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.threads.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  return (
    <SEO meta={meta}>
      <SignIn />
    </SEO>
  );
}
