/**
 * Author : Ryan
 * Date : 2023-03-27
 * Desc : index
 */

import Head from 'next/head';
import { META_COMMON } from '@common/meta';

type Meta = {
  page_title: string;
  page_description: string;
  page_cannonical_link: string;
  page_image: string;
};

type TProps = {
  meta: Meta;
  children: React.ReactNode;
};

export default function SEO({ meta, children }: TProps) {
  return (
    <>
      <Head>
        {/* basic */}
        <title>{meta.page_title}</title>
        <meta name="description" content={meta.page_description} />
        <meta name="keywords" content={META_COMMON.site_keyword} />
        <link rel="canonical" href={meta.page_cannonical_link}></link>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover" />
        {/* open graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={'ko_KR'} />
        <meta property="og:title" content={meta.page_title} />
        <meta property="og:description" content={meta.page_description} />
        <meta property="og:url" content={meta.page_cannonical_link} />
        <meta property="og:image" content={meta.page_image} />
        {/* twitter */}
        <meta name="twitter:card" content={'summary'} />
        <meta name="twitter:title" content={meta.page_title} />
        <meta name="twitter:description" content={meta.page_description} />
        <meta property="twitter:url" content={meta.page_cannonical_link} />
        <meta name="twitter:image" content={meta.page_image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
    </>
  );
}
