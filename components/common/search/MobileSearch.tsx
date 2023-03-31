/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : MobileSearch
 */

import { OPEN_CHAT_GPT_MODAL } from '@libs/redux/modules/modal/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

export default function MobileSearch() {
  // Hooks
  const dispatch = useDispatch();

  const onClickOpenGptModal = useCallback(() => {
    dispatch({ type: OPEN_CHAT_GPT_MODAL, payload: '' });
  }, []);

  return (
    <Wrapper>
      <SearchButton>
        <LeftBox>
          <div />
          <p>무엇이든 물어봐</p>
        </LeftBox>
        <RightBox onClick={onClickOpenGptModal}>
          <img src={'static/images/main/beggar.png'} alt="beggar" />
        </RightBox>
      </SearchButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 20px 0;
`;

const SearchButton = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '50px', '25px')};
  ${({ theme }) => theme.colorSet('black', '#E3F6DD')};
  cursor: pointer;
`;

const LeftBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  margin-left: 20px;
  & > div {
    width: 15px;
    height: 15px;
    ${({ theme }) => theme.backgroundSet('/static/icons/common/search.svg', 'contain')};
  }
  & > p {
    margin-left: 10px;
    ${({ theme }) => theme.fontSet(16, 400, 24)};
  }
`;

const RightBox = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0px;
  & > img {
    ${({ theme }) => theme.boxSet('50px', '70px', '0px')};
    object-fit: cover;
  }
`;
