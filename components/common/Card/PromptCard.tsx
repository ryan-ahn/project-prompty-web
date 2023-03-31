/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : PromptCard
 */

import { TPrompt } from '@libs/models/graphql';
import styled, { css } from 'styled-components';
import { CATEGORY } from '@containers/data';
import { useDispatch } from 'react-redux';
import {
  CLOSE_MODAL,
  OPEN_CHAT_GPT_MODAL,
  OPEN_PROMPT_MODAL,
} from '@libs/redux/modules/modal/actions';
import { useCallback } from 'react';

interface IProps {
  data: TPrompt;
  type: 'item' | 'modal';
}

type TComponentType = {
  attrType: boolean;
};

export default function PromptCard({ data, type }: IProps) {
  // Hoosk
  const dispatch = useDispatch();

  const onClickOpenPromptModal = useCallback(() => {
    if (type === 'item') {
      dispatch({ type: OPEN_PROMPT_MODAL, payload: data });
    }
  }, [type, data]);

  const onClickOpenCreateModal = useCallback(() => {
    dispatch({ type: OPEN_CHAT_GPT_MODAL, payload: data.prompt });
  }, [data]);

  const onClickCloseModal = useCallback(() => {
    dispatch({ type: CLOSE_MODAL });
  }, []);

  return (
    <Wrapper attrType={type === 'item'} onClick={onClickOpenPromptModal}>
      <HeaderBlock>
        <ProfileBox>{data.author.slice(0, 1)}</ProfileBox>
        <AuthorBox>
          <h3>{data.author}</h3>
          <p>{data.position}</p>
        </AuthorBox>
      </HeaderBlock>
      <ContentBlock attrType={type === 'item'}>
        <TitleBox>
          <h2>{data.title}</h2>
          <p>{CATEGORY[data.category]}</p>
        </TitleBox>
        <PromptBox attrType={type === 'item'}>
          <p>{data.prompt}</p>
        </PromptBox>
        {type === 'modal' ? (
          <ChatGPTBox onClick={onClickOpenCreateModal}>이렇게 물어보기</ChatGPTBox>
        ) : null}
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled.div<TComponentType>`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', '100%', '12px')};
  background-color: white;
  filter: drop-shadow(0px 7px 20px rgba(0, 0, 0, 0.1));
  ${props =>
    props.attrType &&
    css`
      cursor: pointer;
    `}
`;

const HeaderBlock = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 16px;
`;

const ProfileBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('40px', '40px', '20px')};
  background-color: #d5e8cf;
`;

const AuthorBox = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'column')};
  ${({ theme }) => theme.boxSet('calc(100% - 40px)', '100%', '0px')};
  padding-left: 15px;
  & > h3 {
    ${({ theme }) => theme.fontSet(16, 500, 24)};
  }
  & > p {
    ${({ theme }) => theme.fontSet(12, 300, 20)};
  }
`;

const ContentBlock = styled.div<TComponentType>`
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  margin-bottom: 16px;
  padding: 16px 16px 0 16px;
  ${props =>
    props.attrType &&
    css`
      height: 160px;
      overflow: hidden;
    `}
`;

const TitleBox = styled.div`
  & > h2 {
    ${({ theme }) => theme.fontSet(18, 500, 24)};
  }
  & > p {
    ${({ theme }) => theme.fontSet(12, 300, 20)};
  }
`;

const PromptBox = styled.div<TComponentType>`
  padding: 25px 0;
  & > p {
    ${({ theme }) => theme.fontSet(15, 300, 24)};
  }
  ${props =>
    props.attrType &&
    css`
      white-space: pre-wrap;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    `}
`;

const ChatGPTBox = styled.div`
  ${({ theme }) => theme.fontSet(15, 500, 24)};
  color: #0057ff;
  text-align: end;
  text-decoration: underline;
  cursor: pointer;
`;
