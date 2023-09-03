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
  character: string;
  search: string | null;
  prompt: string | null;
};
export default function ThreadsPage({ character, search, prompt }: TProps) {
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
      <Threads character={character} search={search} prompt={prompt} />
    </SEO>
  );
}

export const getServerSideProps = async (context: any) => {
  const search = context.query.search ? context.query.search : null;
  const prompt = context.query.prompt ? context.query.prompt : null;
  const character = context.query.character ? context.query.character : '0';
  // await fetch(`https://api.prompty.im/v1/prompt/${prompt}`).then(async res => {
  //   await res.json().then(res2 => console.log(res2));
  // });
  return {
    props: {
      search: search,
      prompt: prompt,
      character: character
    },
  };
};
