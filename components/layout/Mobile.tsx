/**
 * Author : Ryan
 * Date : 2023-03-25
 * Desc : Mobile
 */

import styled, { css } from 'styled-components';
import Modal from '@components/modal';
import { useSelector } from 'react-redux';
import { RootState } from '@libs/redux/modules';

type TProps = {
  children: React.ReactElement;
};

type TScrollComponent = {
  attrScroll: boolean;
};

export default function MobileLayout({ children }: TProps) {
  // Root State
  const { isOpenModal } = useSelector((state: RootState) => state.modal);
  return (
    <Wrapper attrScroll={isOpenModal}>
      {children}
      <Modal />
    </Wrapper>
  );
}

const Wrapper = styled.div<TScrollComponent>`
  position: relative;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100vw', '100vh', '0px')};
  /* padding: 55px 20px; */
  overflow: scroll;
  ${props =>
    props.attrScroll &&
    css`
      overflow: hidden;
    `}
`;
