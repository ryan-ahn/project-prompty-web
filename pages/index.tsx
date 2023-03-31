/**
 * Author : Ryan
 * Date : 2023-04-01
 * Desc : index
 */

import { META_COMMON, META_PAGE } from '@containers/meta';
import SEO from '@components/seo';
import Main from '@components/main';

export default function index() {
  // Value
  const meta = {
    page_title: META_PAGE.main.page_title,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.main.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  return (
    <SEO meta={meta}>
      1
      <Main />
    </SEO>
  );
}
