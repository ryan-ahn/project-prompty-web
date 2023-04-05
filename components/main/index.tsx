/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : index
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { DUMMY } from '@containers/data';
import { INIT_THREAD } from '@libs/redux/modules/main/actions';

type TFocus = {
  attrFocus: boolean;
};

type TVisibility = {
  attrVisibility: boolean;
};

export default function MainIndex() {
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

  const onClickRouteToThreads = useCallback((id: number) => {
    router.push(`/threads/?search=sample${id + 1}`);
  }, []);

  const onClickSearch = useCallback(() => {
    router.push(`/threads/?search=${input}`);
  }, [input]);

  const onKeyPressEnter = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        router.push(`/threads/?search=${input}`);
      }
    },
    [input],
  );

  useEffect(() => {
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    dispatch({ type: INIT_THREAD });
  }, []);

  // Render Item
  const renderItem = useCallback((data: any) => {
    return (
      <ItemWrapper onClick={() => onClickRouteToThreads(data.id)}>
        <h2>{data.promptList[0].prompt}</h2>
        <p>{data.promptList[0].answer}</p>
      </ItemWrapper>
    );
  }, []);

  // Render List
  const renderList = useCallback(() => {
    return DUMMY.map(item => <div key={item.id}>{renderItem(item)}</div>);
  }, []);

  return (
    <Wrapper>
      <HeaderArea>
        <img src={'static/logo.png'} alt="logo" />
      </HeaderArea>
      <ContentArea>
        <ContentBolck>
          <TitleBox>
            <img src={'static/logo.png'} alt="logo" />
            <h1>PROMPTY</h1>
          </TitleBox>
          <SearchBox>
            <InputBox
              ref={inputRef}
              value={input}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              attrFocus={focus}
              placeholder="무엇이든 물어보세요!"
              onChange={e => onChangeInputText(e.target.value)}
              onKeyUp={onKeyPressEnter}
            />
            <ButtonBox>
              <img src={'static/arrow-enter.png'} alt="enter" onClick={onClickSearch} />
            </ButtonBox>
            <CloseBox attrVisibility={input.length > 0} onClick={() => setInput('')}>
              <img src={'static/button_close.png'} alt="close" />
            </CloseBox>
          </SearchBox>
          <PopularBlock>
            <LineHeader>
              <div>
                <img src={'static/popular.png'} alt="popular" />
                <p>인기있는 질문</p>
              </div>
              <img src={'static/filter.png'} alt="filter" />
            </LineHeader>
            <ListBox>{renderList()}</ListBox>
          </PopularBlock>
        </ContentBolck>
        <BottomBlock>
          <BottomContent>
            <div>
              <p>
                {
                  '무엇이든 물어보세요! AI가 모두 답변해줍니다.\n연결된 AI 답변을 통해 지식을 확장시켜보아요. 다만, 질문에 개인 정보를 입력하지 마십시오!'
                }
              </p>
            </div>
            <div>
              <Link href={'/policy'}>
                <p>개인정보 처리방침</p>
              </Link>
              <Link href={'/service'}>
                <p>서비스 이용약관</p>
              </Link>
            </div>
          </BottomContent>
        </BottomBlock>
      </ContentArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
`;

const HeaderArea = styled.nav`
  position: fixed;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '55px', '0px')};
  padding: 0 20px;
  border-bottom: 1px solid #202020;
  background-color: #101010;
  z-index: 2;
  & > img {
    ${({ theme }) => theme.boxSet('auto', '40px', '0px')};
  }
`;

const ContentArea = styled.section`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', '100vh', '0px')};
  @media (max-height: 900px) and (max-width: 800px) {
    ${({ theme }) => theme.boxSet('100%', '900px', '0px')};
  }
`;

const ContentBolck = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  max-width: 800px;
  padding: 75px 20px 20px 20px;
`;

const TitleBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 20px;
  & > img {
    ${({ theme }) => theme.boxSet('auto', '60px', '0px')};
    margin-right: 10px;
  }
  & > h1 {
    ${({ theme }) => theme.fontSet(50, 700, 70)};
    @media (max-width: 350px) {
      ${({ theme }) => theme.fontSet(40, 700, 50)};
    }
  }
`;

const SearchBox = styled.div`
  position: relative;
  ${({ theme }) => theme.boxSet('100%', '70px', '0px')};
`;

const InputBox = styled.input<TFocus>`
  ${({ theme }) => theme.boxSet('100%', '100%', '35px')};
  padding: 0 130px 0 30px;
  border: 1.5px solid #606060;
  background-color: #202020;
  color: white;
  ${({ theme }) => theme.fontSet(20, 400, 30)};
  ${props =>
    props.attrFocus &&
    css`
      background-color: #000000;
    `}
`;

const ButtonBox = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('55px', '55px', '50%')};
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
  right: 80px;
  visibility: hidden;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  & > img {
    ${({ theme }) => theme.boxSet('40px', '40px', '0px')};
  }
  ${props =>
    props.attrVisibility &&
    css`
      visibility: visible;
    `}
`;

const PopularBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  margin-top: 35px;
`;

const LineHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '60px', '0px')};
  border-bottom: 0.5px solid #606060;
  & > div {
    ${({ theme }) => theme.flexSet('center', 'center', 'row')};
    & > img {
      ${({ theme }) => theme.boxSet('auto', '25px', '0px')};
      margin-right: 8px;
    }
    & > p {
      ${({ theme }) => theme.fontSet(20, 400, 30)};
    }
  }
  & > img {
    ${({ theme }) => theme.boxSet('auto', '25px', '0px')};
  }
`;

const ListBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  flex-wrap: wrap;
  padding: 20px 0;
  gap: 20px;
`;

const ItemWrapper = styled.div`
  ${({ theme }) => theme.boxSet('240px', 'auto', '12px')};
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  padding: 20px 15px;
  border: 1px solid #606060;
  background-color: #202020;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 100%;
  }
  & > h2 {
    display: -webkit-box;
    margin-bottom: 5px;
    color: #f1f1f1;
    overflow: hidden;
    ${({ theme }) => theme.fontSet(14, 500, 24)};
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  & > p {
    display: -webkit-box;
    overflow: hidden;
    color: #c1c1c1;
    ${({ theme }) => theme.fontSet(14, 100, 20)};
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const BottomBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '140px', '0px')};
  background-color: #050505;
`;

const BottomContent = styled.div`
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  max-width: 800px;
  padding: 20px;
  & > div:nth-child(1) {
    & > p {
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #404040;
      color: #b1b1b1;
      ${({ theme }) => theme.fontSet(13, 300, 20)};
      white-space: pre-wrap;
    }
  }
  & > div:nth-child(2) {
    ${({ theme }) => theme.flexSet('center', 'center', 'row')};
    gap: 10px;
    & > a {
      & > p {
        padding-top: 10px;
        color: #b1b1b1;
        ${({ theme }) => theme.fontSet(13, 100, 20)};
        cursor: pointer;
      }
    }
  }
`;
