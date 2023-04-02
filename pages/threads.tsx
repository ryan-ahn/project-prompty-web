/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : threads
 */

import { META_COMMON, META_PAGE } from '@containers/meta';
import SEO from '@components/seo';
import Threads from '@components/threads';

export default function ThreadsPage() {
  // Value
  const meta = {
    page_title: META_PAGE.threads.page_title,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.threads.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  return (
    <SEO meta={meta}>
      <Threads />
    </SEO>
  );
}
