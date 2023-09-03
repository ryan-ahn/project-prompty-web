/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : index
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { TProps } from 'pages/threads';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@libs/redux/modules';
import {
  POST_GPT_CHAIN_REQUEST,
  POST_GPT_RELATION_REQUEST,
  INIT_THREAD,
  POST_PROMPT_REQUEST,
  GET_PROMPT_REQUEST,
  POST_GPT_SUMMARY_REQUEST,
} from '@libs/redux/modules/main/actions';
import Toast from '@components/toast';
import { OPEN_MODAL } from '@libs/redux/modules/modal/actions';

type TVisibility = {
  attrVisibility: boolean;
};

type TFocus = {
  attrFocus: boolean;
};

export default function index({ character, search, prompt }: TProps) {
  // Root State
  const { chain, relation, isLoadingChain, isLoadingQuestion } = useSelector(
    (state: RootState) => state.main,
  );
  const { isOpenToast, toastText } = useSelector((state: RootState) => state.toast);
  // State
  const [input, setInput] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  // Ref
  const inputRef = useRef<HTMLInputElement>(null);
  // Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  const onChangeInputText = useCallback(
    (value: string) => {
      setInput(value);
    },
    [input],
  );

  const onClickSearch = useCallback(() => {
    if (input.length > 0) {
      dispatch({ type: POST_GPT_CHAIN_REQUEST, payload: { character: character, assistant: chain, input: input } });
      dispatch({ type: POST_GPT_RELATION_REQUEST, payload: { character: character, assistant: chain, input: input } });
      setInput('');
    }
  }, [input, chain]);

  const onKeyPressEnter = useCallback(
    (e: any) => {
      if (input.length > 0 && e.key === 'Enter') {
        dispatch({ type: POST_GPT_CHAIN_REQUEST, payload: { character: character, assistant: chain, input: input } });
        dispatch({ type: POST_GPT_RELATION_REQUEST, payload: { character: character, assistant: chain, input: input } });
        setInput('');
      }
    },
    [input, chain],
  );

  const onClickAddChain = useCallback(
    (text: string) => {
      dispatch({ type: POST_GPT_CHAIN_REQUEST, payload: { character: character, assistant: chain, input: text } });
      dispatch({ type: POST_GPT_RELATION_REQUEST, payload: { assistant: chain, input: text } });
    },
    [chain],
  );

  const onClickRelationReload = useCallback(() => {
    if (chain !== null) {
      dispatch({
        type: POST_GPT_RELATION_REQUEST,
        payload: { assistant: chain, input: chain[chain.length - 1].prompt },
      });
    }
  }, [chain]);

  const onClickOpenShareModal = useCallback(() => {
    if (chain) {
      onClickCreatePrompt();
      dispatch({ type: OPEN_MODAL, payload: 'THREAD_SHARE' });
    }
  }, [chain]);

  const onClickOpenSummaryModal = useCallback(() => {
    if (chain) {
      onClickSummaryPrompt();
      dispatch({ type: OPEN_MODAL, payload: 'THREAD_SUMMARY' });
    }
  }, [chain]);

  const onClickCreatePrompt = useCallback(() => {
    dispatch({ type: POST_PROMPT_REQUEST, payload: { promptList: chain, category: 0 } });
  }, [chain]);

  const onClickSummaryPrompt = useCallback(() => {
    dispatch({ type: POST_GPT_SUMMARY_REQUEST, payload: { assistant: chain } });
  }, [chain]);

  const onClickRouteToMain = useCallback(() => {
    router.push('/');
  }, []);

  const routeChangeStart = useCallback(() => {
    dispatch({ type: INIT_THREAD });
  }, []);

  const onClickEmTagPushEvent = useCallback((tagHtml: HTMLElement) => {
    onClickAddChain(tagHtml.innerHTML);
  }, []);

  useEffect(() => {
    if (isLoadingChain || isLoadingQuestion) {
      window.scrollTo({ top: 10000, behavior: 'smooth' });
    }
  }, [isLoadingChain, isLoadingQuestion]);

  useEffect(() => {
    if (search !== null) {
      dispatch({ type: POST_GPT_CHAIN_REQUEST, payload: { character: character, assistant: chain, input: search } });
      dispatch({ type: POST_GPT_RELATION_REQUEST, payload: { assistant: chain, input: search } });
    }
    if (prompt !== null) {
      dispatch({ type: GET_PROMPT_REQUEST, payload: { id: prompt } });
    }
  }, [search, prompt]);

  useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [router.events]);

  useEffect(() => {
    if (chain !== null) {
      const getEmTag = document.getElementsByTagName('em');
      for (let i = 0; i < getEmTag.length; i++) {
        getEmTag[i].addEventListener('click', () => onClickEmTagPushEvent(getEmTag[i]));
      }
    }
  }, [chain]);

  // Render Item
  const renderItem = useCallback(
    (chain: any) => {
      return (
        <ItemWrapper>
          <PromptBox>
            <h2>{chain.prompt}</h2>
          </PromptBox>
          <ReplyBox>
            <LineBox>
              <div>
                <img src={'static/reply.png'} alt="reply" />
                <p>AI의 답변이에요</p>
              </div>
            </LineBox>
            <p id="answer" dangerouslySetInnerHTML={{ __html: chain.answer }} />
          </ReplyBox>
        </ItemWrapper>
      );
    },
    [chain, relation],
  );

  const renderRelation = useCallback(() => {
    if (relation !== null && !isLoadingQuestion) {
      return (
        <ItemWrapper>
          <LineBox>
            <div>
              <img src={'static/add_question.png'} alt="reply" />
              <p>이런 추가 질문은 어때요?</p>
            </div>
            <img src={'static/button-reload.png'} alt="reload" onClick={onClickRelationReload} />
          </LineBox>
          {relation
            .replace(/[1-9]. |"|-|- /g, '')
            .replace(/\n\n/g, '\n')
            .split('\n')
            .filter(line => line.length > 0 || line !== ' ')
            .map((line, index) => (
              <QuestionBox key={index} onClick={() => onClickAddChain(line)}>
                <p>{`${index + 1}. ${line}`}</p>
                <img src={'static/plus.png'} alt="add" />
              </QuestionBox>
            ))}
        </ItemWrapper>
      );
    } else {
      return (
        <ItemWrapper>
          <LineBox>
            <div>
              <img src={'static/add_question.png'} alt="reply" />
              <p>이런 추가 질문은 어때요?</p>
            </div>
          </LineBox>
          <SkeletonQuestion />
          <SkeletonQuestion />
          <SkeletonQuestion />
        </ItemWrapper>
      );
    }
  }, [chain, relation, isLoadingQuestion]);

  // Render List
  const renderList = useCallback(() => {
    if (chain) {
      return chain.map((item, index) => <ListWrapper key={index}>{renderItem(item)}</ListWrapper>);
    } else {
      return (
        <ItemWrapper>
          <SkeletonPrompt />
          <ReplyBox>
            <LineBox>
              <div>
                <img src={'static/reply.png'} alt="reply" />
                <p>AI의 답변이에요</p>
              </div>
            </LineBox>
            <SkeletonAnswer />
            <SkeletonAnswer />
            <SkeletonAnswer />
          </ReplyBox>
        </ItemWrapper>
      );
    }
  }, [chain]);

  return (
    <Wrapper>
      <Toast inverted={isOpenToast} text={toastText} />
      <HeaderArea>
        <div>
          <img src={'static/logo_white.png'} alt="logo" onClick={onClickRouteToMain} />
          <div>
            <img src={'static/home.png'} alt="button" onClick={onClickRouteToMain} />
            <img src={'static/save.png'} alt="button" onClick={onClickRouteToMain} />
            <img src={'static/share.png'} alt="button" onClick={onClickOpenShareModal} />
            <img src={'static/summary.png'} alt="button" onClick={onClickOpenSummaryModal} />
          </div>
        </div>
      </HeaderArea>
      <ContentArea>{renderList()}</ContentArea>
      <SkeletonArea attrVisibility={chain !== null && isLoadingChain}>
        <ItemWrapper>
          <SkeletonPrompt />
          <ReplyBox>
            <LineBox>
              <div>
                <img src={'static/reply.png'} alt="reply" />
                <p>AI의 답변이에요</p>
              </div>
            </LineBox>
            <SkeletonAnswer />
            <SkeletonAnswer />
            <SkeletonAnswer />
          </ReplyBox>
        </ItemWrapper>
      </SkeletonArea>
      <RelationArea>{renderRelation()}</RelationArea>
      <AddPromptArea>
        <SearchBox>
          <InputBox
            ref={inputRef}
            value={input}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            attrFocus={focus}
            placeholder="추가로 물어보세요!"
            onChange={e => onChangeInputText(e.target.value)}
            onKeyUp={onKeyPressEnter}
          />
          <ButtonBox>
            <img src={'static/arrow-enter.png'} alt="enter" onClick={onClickSearch} />
          </ButtonBox>
          <CloseBox attrVisibility={input.length > 0} onClick={() => setInput('')}>
            <img src={'static/button-close.png'} alt="close" />
          </CloseBox>
        </SearchBox>
      </AddPromptArea>
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
    & > div {
      display: flex;
      gap: 15px;
      & > img {
        ${({ theme }) => theme.boxSet('auto', '30px', '0px')};
        cursor: pointer;
      }
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

const RelationArea = styled.section`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  max-width: 800px;
  padding-bottom: 150px;
  border-left: 1px solid #202020;
  border-right: 1px solid #202020;
  border-bottom: 1px solid #202020;
`;

const ListWrapper = styled.div`
  width: 100%;
`;
const ItemWrapper = styled.div`
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  padding: 25px 25px 0 25px;
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
    word-break: break-all;
  }
`;

const ReplyBox = styled.div`
  width: 100%;
  border-bottom: 1px solid #202020;
  padding-bottom: 30px;
  & > p {
    color: #c1c1c1;
    ${({ theme }) => theme.fontSet(15, 400, 25)};
    white-space: pre-wrap;
    word-break: break-all;
    & > em {
      color: #ffc7a5;
      font-weight: 700;
      padding: 0 2px;
      cursor: pointer;
    }
  }
`;

const LineBox = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  & > div {
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
  }
  & > img {
    ${({ theme }) => theme.boxSet('25px', 'auto', '0px')};
  }
`;

const QuestionBox = styled.div`
  ${({ theme }) => theme.boxSet('100%', 'auto', '20px')};
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  padding: 5px 15px;
  margin-top: 10px;
  border: 1px solid white;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid #009ffc;
  }
  & > p {
    ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
    ${({ theme }) => theme.fontSet(14, 400, 20)};
  }
  & > img {
    ${({ theme }) => theme.boxSet('15px', 'auto', '0px')};
    margin-left: 10px;
  }
`;

const AddPromptArea = styled.div`
  position: fixed;
  bottom: 50px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')}
  padding: 0 25px;
  & > div {
    ${({ theme }) => theme.boxSet('100%', '50px', '25px')};
    ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
    border: 1px solid white;
  }
`;

const SearchBox = styled.div`
  position: relative;
  ${({ theme }) => theme.boxSet('100%', '50px', '0px')};
  max-width: 550px;
`;

const InputBox = styled.input<TFocus>`
  ${({ theme }) => theme.boxSet('100%', '100%', '25px')};
  padding: 0 90px 0 30px;
  border: 1.5px solid #606060;
  background-color: #202020;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 25)};
  ${props =>
    props.attrFocus &&
    css`
      background-color: #000000;
    `}
`;

const ButtonBox = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('40px', '40px', '50%')};
  background: linear-gradient(to top, #2af499, #009ffc);
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  & > img {
    ${({ theme }) => theme.boxSet('80%', 'auto', '50%')};
  }
`;

const CloseBox = styled.button<TVisibility>`
  position: absolute;
  top: 15px;
  right: 50px;
  visibility: hidden;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  & > img {
    ${({ theme }) => theme.boxSet('20px', '20px', '0px')};
  }
  ${props =>
    props.attrVisibility &&
    css`
      visibility: visible;
    `}
`;

const SkeletonArea = styled.div<TVisibility>`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  max-width: 800px;
  border-left: 1px solid #202020;
  border-right: 1px solid #202020;
  display: none;
  ${props =>
    props.attrVisibility &&
    css`
      display: block;
    `}
`;

const SkeletonPrompt = styled.div`
  ${({ theme }) => theme.boxSet('70%', '30px', '20px')};
  margin: 8px 0;
  animation: skeleton-ui 1.8s infinite ease-in-out;
  -webkit-animation: skeleton-ui 1.8s infinite ease-in-out;
`;

const SkeletonAnswer = styled.div`
  ${({ theme }) => theme.boxSet('100%', '20px', '20px')};
  margin: 10px 0;
  animation: skeleton-ui 1.8s infinite ease-in-out;
  -webkit-animation: skeleton-ui 1.8s infinite ease-in-out;
`;

const SkeletonQuestion = styled.div`
  ${({ theme }) => theme.boxSet('100%', '32px', '20px')};
  margin-top: 10px;
  animation: skeleton-ui 1.8s infinite ease-in-out;
  -webkit-animation: skeleton-ui 1.8s infinite ease-in-out;
`;
