/**
 * Author : Ryan
 * Date : 2023-05-21
 * Desc : myListModal
 */

import jsCookie from 'js-cookie';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SIGN_OUT } from '@libs/redux/modules/user/actions';
import { CLOSE_MODAL } from '@libs/redux/modules/modal/actions';

export default function MyListModal() {
  // Hooks
  const dispatch = useDispatch();

  const onClickSignOut = () => {
    jsCookie.remove('access');
    dispatch({ type: SIGN_OUT });
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <Wrapper>
      <ModalItem>
        <p>공지사항</p>
      </ModalItem>
      <ModalItem>
        <p>마이페이지</p>
      </ModalItem>
      <ModalItem>
        <p>이용방법</p>
      </ModalItem>
      <ModalItem onClick={onClickSignOut}>
        <p>로그아웃</p>
      </ModalItem>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  padding: 25px;
`;

const ModalItem = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '60px', '0px')};
  border-bottom: 1px solid #606060;
  & > p {
    ${({ theme }) => theme.fontSet(20, 700, 32)};
  }
`;
