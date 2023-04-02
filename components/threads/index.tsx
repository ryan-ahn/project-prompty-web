/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : index
 */

import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { DUMMY } from '@containers/data';

export default function index() {
  // Hooks
  const router = useRouter();

  const onClickRouteToMain = useCallback(() => {
    router.push('/');
  }, []);

  // Render Item
  const renderItem = useCallback((data: any) => {
    return (
      <ItemWrapper>
        <PromptBox>
          <h2>{data.prompt}</h2>
        </PromptBox>
        <ReplyBox>
          <LineBox>
            <img src={'static/reply.png'} alt="reply" />
            <p>AI의 답변이에요</p>
          </LineBox>
          <p>{data.answer}</p>
        </ReplyBox>
      </ItemWrapper>
    );
  }, []);

  // Render List
  const renderList = useCallback(() => {
    return DUMMY[2].promptList.map((item, index) => <div key={index}>{renderItem(item)}</div>);
  }, []);

  return (
    <Wrapper>
      <HeaderArea>
        <div>
          <img src={'static/logo_white.png'} alt="logo" onClick={onClickRouteToMain} />
          <button onClick={onClickRouteToMain}>{'새로 질문하기'}</button>
        </div>
      </HeaderArea>
      <ContentArea>{renderList()}</ContentArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
`;

const HeaderArea = styled.nav`
  position: fixed;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '55px', '0px')};
  padding: 0 20px;
  border-bottom: 1px solid #202020;
  background-color: #101010;
  z-index: 2;
  & > div {
    ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
    ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
    max-width: 800px;
    & > img {
      ${({ theme }) => theme.boxSet('auto', '40px', '0px')};
      cursor: pointer;
    }
    & > button {
      ${({ theme }) => theme.boxSet('120px', '35px', '18px')};
      color: white;
      background-color: #009ffc;
      ${({ theme }) => theme.fontSet(14, 500, 20)};
      cursor: pointer;
    }
  }
`;

const ContentArea = styled.section`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  margin-top: 55px;
  max-width: 800px;
  border-left: 1px solid #202020;
  border-right: 1px solid #202020;
`;

const ItemWrapper = styled.div`
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  padding: 25px;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const PromptBox = styled.div`
  & > h2 {
    color: #f1f1f1;
    ${({ theme }) => theme.fontSet(20, 500, 28)};
    white-space: pre-wrap;
    margin-bottom: 15px;
  }
`;

const ReplyBox = styled.div`
  border-bottom: 1px solid #202020;
  padding-bottom: 30px;
  & > p {
    color: #c1c1c1;
    ${({ theme }) => theme.fontSet(15, 400, 25)};
    white-space: pre-wrap;
  }
`;

const LineBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '35px', '0px')};
  & > img {
    ${({ theme }) => theme.boxSet('14px', 'auto', '0px')};
    margin-right: 10px;
  }
  & > p {
    color: #009ffc;
    ${({ theme }) => theme.fontSet(14, 400, 20)};
  }
`;
