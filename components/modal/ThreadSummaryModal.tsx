/**
 * Author : Ryan
 * Date : 2023-05-21
 * Desc : ThreadShareModal
 */

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@libs/redux/modules';
import { useCallback } from 'react';
import LoadingSpinner from '@components/loading/Spinner';

export default function ThreadSummaryModal() {
  // Root State
  const { summary, isLoadingSummary } = useSelector((state: RootState) => state.main);

  const renderSummaryBlock = useCallback(() => {
    if (isLoadingSummary && !summary) {
      return <LoadingSpinner />;
    } else {
      return <SummaryText>{summary}</SummaryText>;
    }
  }, [isLoadingSummary, summary]);

  return (
    <Wrapper>
      <HeaderBlock>
        <p>대화 내용 요약</p>
      </HeaderBlock>
      <ContentBlock>{renderSummaryBlock()}</ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 15px 20px;
`;

const HeaderBlock = styled.div`
  margin-bottom: 15px;
  & > p {
    ${({ theme }) => theme.fontSet(20, 700, 32)};
  }
`;

const ContentBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 10px 0;
`;

const SummaryText = styled.p`
  color: #c1c1c1;
  ${({ theme }) => theme.fontSet(15, 400, 25)};
  white-space: pre-wrap;
  word-break: break-all;
`;
