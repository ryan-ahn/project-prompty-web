/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : MobileHeader
 */

import { OPEN_MODAL } from '@libs/redux/modules/modal/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

export default function MobileHeader() {
  // Hooks
  const dispatch = useDispatch();

  const onClickOpenCreateModal = useCallback(() => {
    dispatch({ type: OPEN_MODAL, payload: 'CREATE_PROMPT' });
  }, []);

  return (
    <Wrapper>
      <HambergBox onClick={onClickOpenCreateModal}>
        <div />
        <div />
        <div />
      </HambergBox>
      <LogoBox>
        <img src={'/static/icons/common/logo.png'} alt="logo" />
      </LogoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 10px 20px 10px 20px;
  background-color: #f4fbee;
  z-index: 1;
`;

const HambergBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('15px', '35px', '0px')};
  gap: 3px;
  & > div {
    ${({ theme }) => theme.boxSet('100%', '1px', '0px')};
    border-bottom: 2px solid #202020;
  }
`;

const LogoBox = styled.div`
  ${({ theme }) => theme.boxSet('120px', '35px', '0px')};
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  & > img {
    ${({ theme }) => theme.boxSet('100px', '35px', '0px')};
    object-fit: contain;
  }
`;
