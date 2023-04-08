/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : threads
 */

import { META_COMMON, META_PAGE } from '@common/meta';
import SEO from '@components/seo';
import Share from '@containers/share';

export default function SharePage() {
  // Value
  const meta = {
    page_title: `Prompty AI : Content`,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.threads.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  return (
    <SEO meta={meta}>
      <Share />
    </SEO>
  );
}
