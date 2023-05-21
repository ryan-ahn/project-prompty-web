/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : threads
 */

import { META_COMMON, META_PAGE } from 'common/meta';
import SEO from '@components/seo';
import Threads from '@containers/threads';
import Modal from '@components/modal';

export type TProps = {
  search: string | null;
  prompt: string | null;
};
export default function ThreadsPage({ search, prompt }: TProps) {
  // Value
  const title = search !== null ? search : '공유 페이지';
  const meta = {
    page_title: `Prompty AI : ${title}`,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.threads.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };

  return (
    <SEO meta={meta}>
      <Modal />
      <Threads search={search} prompt={prompt} />
    </SEO>
  );
}

export const getServerSideProps = async (context: any) => {
  const search = context.query.search ? context.query.search : null;
  const prompt = context.query.prompt ? context.query.prompt : null;
  return {
    props: {
      search: search,
      prompt: prompt,
    },
  };
};
