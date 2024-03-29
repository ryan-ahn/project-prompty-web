/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : index
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { TAG_LIST, CHARACTER_LIST } from '@common/data';
import { lottoNum } from '@libs/utils/recursiveFunc';
import { RootState } from '@libs/redux/modules';
import { OPEN_MODAL } from '@libs/redux/modules/modal/actions';
import { CONTENT_PAGE } from '@common/content';

type TFocus = {
  attrFocus: boolean;
};

type TVisibility = {
  attrVisibility: boolean;
};

type TActive = {
  attrActive: boolean;
};

export default function MainIndex() {
  // Root State
  const { isLoggedIn, userDetail } = useSelector((state: RootState) => state.user);
  // State
  const [recommendList, setRecommendList] = useState([0, 1, 2]);
  const [character, setCharacter] = useState(0);
  const [tag, setTag] = useState('공감');
  const [input, setInput] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  // Ref
  const inputRef = useRef<HTMLInputElement>(null);
  // Hooks
  const router = useRouter();
  const dispatch = useDispatch();
  // Variable
  const bottomText = CONTENT_PAGE.main.bottom.text;
  const policyText = CONTENT_PAGE.main.bottom.policy;
  const serviceText = CONTENT_PAGE.main.bottom.service;
  // Functions
  const onChangeInputText = useCallback(
    (value: string) => {
      setInput(value);
    },
    [input],
  );

  const onClickChangeCharacter = useCallback((target: string) => {
    switch (target) {
      case 'left':
        if (character === 0) {
          setCharacter(2)
        } else {
          setCharacter(character - 1)
        }
      case 'right':
        if (character === 2) {
          setCharacter(0)
        } else {
          setCharacter(character + 1)
        }
    }

  },[character])

  const onClickRouteToThreads = useCallback((keyword: string) => {
    router.push(`/threads/?character=${character}&search=${keyword}`);
  }, [character]);

  const onClickRouteToSignin = useCallback(() => {
    router.push('/signin');
  }, []);

  const onClickOpenMyModal = useCallback(() => {
    dispatch({ type: OPEN_MODAL, payload: 'MY_LIST' });
  }, []);

  const onClickSearch = useCallback(() => {
    if (input.length > 0) {
      router.push(`/threads/?character=${character}&search=${input}`);
    }
  }, [character, input]);

  const onKeyPressEnter = useCallback(
    (e: any) => {
      if (input.length > 0 && e.key === 'Enter') {
        router.push(`/threads/?character=${character}&search=${input}`);
      }
    },
    [character, input],
  );

  const setRandomRecommend = useCallback(() => {
    setRecommendList(lottoNum());
  }, []);

  useEffect(() => {
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  // Cycle
  useEffect(() => {
    setRandomRecommend();
  }, []);

  // Render Item
  const renderItem = useCallback((text: string, index: number) => {
    return (
      <ItemWrapper onClick={() => onClickRouteToThreads(text)}>
        <h2>{`${index + 1}. ${text}`}</h2>
      </ItemWrapper>
    );
  }, [character]);

  const renderUser = useCallback(() => {
    switch (isLoggedIn) {
      case true:
        if (userDetail) {
          return (
            <UserBox onClick={onClickOpenMyModal}>
              <img src={userDetail?.profileImage} alt="user" />
            </UserBox>
          );
        }
      case false:
        return (
          <SigninBox onClick={onClickRouteToSignin}>
            <p>Sign In</p>
          </SigninBox>
        );
    }
  }, [isLoggedIn, userDetail]);

  // Render List
  const renderList = useCallback(() => {
    if (recommendList !== null) {
      const filteredList = TAG_LIST.filter(item => item.name === tag)[0];
      const includesItem = filteredList.list.filter(item => recommendList.includes(item.id));
      return includesItem.map((item, index) => (
        <ItemBox key={index}>{renderItem(item.text, index)}</ItemBox>
      ));
    }
  }, [tag, recommendList, character]);

  const renderTagList = useCallback(() => {
    return TAG_LIST.map(item => (
      <TagItem key={item.id} attrActive={tag === item.name} onClick={() => setTag(item.name)}>
        {item.name}
      </TagItem>
    ));
  }, [tag, character]);

  return (
    <Wrapper>
      <HeaderArea>
        <div>
          <img src={'static/logo-text-new.png'} alt="logo" />
        </div>
        {renderUser()}
      </HeaderArea>
      <ContentArea>
        <ContentBolck>
          <Character>
            <p>{CHARACTER_LIST[character].character}</p>
            <p>{CHARACTER_LIST[character].description}</p>
          </Character>
          <TitleBox>
            <div onClick={() => onClickChangeCharacter('left')}>
              <img src='/static/arrow-left.png' alt='arrow'/>
            </div>
            <div>
              <img src={`/static/character-${CHARACTER_LIST[character].name}.png`} alt='character'/>
            </div>
            <div onClick={() => onClickChangeCharacter('right')}>
              <img src='/static/arrow-right.png' alt='arrow'/>
            </div>
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
              <img src={'static/button-close.png'} alt="close" />
            </CloseBox>
          </SearchBox>
          <PopularBlock>
            <LineHeader>
              <div>
                <img src={'static/popular.png'} alt="popular" />
                <p>추천 질문</p>
              </div>
              <img src={'static/button-reload.png'} alt="reload" onClick={setRandomRecommend} />
            </LineHeader>
            <TagBox>{renderTagList()}</TagBox>
            <ListBox>{renderList()}</ListBox>
          </PopularBlock>
        </ContentBolck>
        <BottomBlock>
          <BottomContent>
            <div>
              <p>{bottomText}</p>
            </div>
            <div>
              <Link href={'/policy'}>
                <p>{policyText}</p>
              </Link>
              <Link href={'/service'}>
                <p>{serviceText}</p>
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
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '55px', '0px')};
  padding: 0 20px;
  border-bottom: 1px solid #202020;
  background-color: #101010;
  z-index: 2;
  & > div:nth-child(1) {
    ${({ theme }) => theme.flexSet('center', 'center', 'row')};
    gap: 10px;
    & > img {
      ${({ theme }) => theme.boxSet('auto', '30px', '0px')};
    }
  }
`;

const ContentArea = styled.section`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', '100vh', '0px')};
  @media (max-height: 900px) and (max-width: 800px) {
    ${({ theme }) => theme.boxSet('100%', '1050px', '0px')};
  }
`;

const ContentBolck = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  max-width: 800px;
  padding: 75px 20px 20px 20px;
`;

const Character = styled.div`
${({ theme }) => theme.flexSet('center', 'center', 'column')};
gap: 6px;
& > p:nth-child(1) {
    ${({ theme }) => theme.fontSet(20, 500, 32)};
  }
  & > p:nth-child(2) {
    ${({ theme }) => theme.fontSet(13, 300, 20)};

  }
`
const TitleBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 20px;
  gap: 20px;
  & > div:nth-child(1) {
    & > img {
      ${({ theme }) => theme.boxSet('30px', '30px', '0px')};
      opacity: 0.5;
      object-fit: contain;
      :hover {
        opacity: 1;
      }
    }
  }
  & > div:nth-child(2) {
    ${({ theme }) => theme.boxSet('100px', '100px', '0px')};
    ${({ theme }) => theme.flexSet('center', 'center', 'row')};
    & > img {
      ${({ theme }) => theme.boxSet('auto', '100px', '0px')};
    }
  }
  & > div:nth-child(3) {
    & > img {
      ${({ theme }) => theme.boxSet('30px', '30px', '0px')};
      opacity: 0.5;
      object-fit: contain;
      :hover {
        opacity: 1;
      }
    }
  }
`;

const SearchBox = styled.div`
  position: relative;
  ${({ theme }) => theme.boxSet('100%', '70px', '0px')};
  @media (max-width: 400px) {
    ${({ theme }) => theme.boxSet('100%', '50px', '0px')};
  }
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
  @media (max-width: 400px) {
    padding: 0 60px 0 30px;
  }
`;

const ButtonBox = styled.button`
  position: absolute;
  top: 7px;
  right: 7px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('55px', '55px', '50%')};
  background-color: #009ffc;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  & > img {
    ${({ theme }) => theme.boxSet('80%', 'auto', '50%')};
  }
  @media (max-width: 400px) {
    ${({ theme }) => theme.boxSet('35px', '35px', '50%')};
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
  @media (max-width: 400px) {
    display: none;
  }
`;

const PopularBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  margin-top: 35px;
`;

const LineHeader = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  border-bottom: 0.5px solid #606060;
  & > div {
    ${({ theme }) => theme.flexSet('center', 'center', 'row')};
    padding: 5px 0;
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
    cursor: pointer;
  }
`;

const ListBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  flex-wrap: wrap;
  gap: 20px;
`;

const ItemBox = styled.div`
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ItemWrapper = styled.div`
  ${({ theme }) => theme.boxSet('240px', '110px', '12px')};
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  padding: 20px 15px;
  border: 1px solid #606060;
  background-color: #202020;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    height: auto;
  }
  & > h2 {
    display: -webkit-box;
    color: #f1f1f1;
    overflow: hidden;
    ${({ theme }) => theme.fontSet(14, 500, 24)};
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-all;
    -webkit-line-clamp: 3;
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

const TagBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  padding: 15px 0;
  overflow-x: scroll;
  gap: 7px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagItem = styled.p<TActive>`
  padding: 7px 12px;
  border: 1px solid #b1b1b1;
  border-radius: 15px;
  cursor: pointer;
  ${props =>
    props.attrActive &&
    css`
      color: white;
      background-color: #009ffc;
      border: 1px solid #009ffc;
    `}
`;

const UserBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('40px', '40px', '5px')};
  overflow: hidden;
  cursor: pointer;
  & > img {
    width: 40px;
  }
`;

const SigninBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('80px', '35px', '5px')};
  ${({ theme }) => theme.colorSet('white', '#009ffc')};
  cursor: pointer;
  & > p {
    ${({ theme }) => theme.fontSet(13, 400, 20)};
  }
`;
