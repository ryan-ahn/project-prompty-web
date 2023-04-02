/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : threads
 */

import { META_COMMON, META_PAGE } from '@containers/meta';
import SEO from '@components/seo';
import Threads from '@components/threads';

export type TProps = {
  search: string | null;
};
export default function ThreadsPage({ search }: TProps) {
  // Value
  const meta = {
    page_title: META_PAGE.threads.page_title,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.threads.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  return (
    <SEO meta={meta}>
      <Threads search={search} />
    </SEO>
  );
}

export const getServerSideProps = async (context: any) => {
  const search = context.query.search ? context.query.search : null;
  return {
    props: {
      search: search,
    },
  };
};
