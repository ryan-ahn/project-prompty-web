/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : index
 */

import { useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { RootState } from '@libs/redux/modules';
import { CLOSE_MODAL } from '@libs/redux/modules/modal/actions';

type TWrapper = {
  open: boolean;
};

type TDimmedArea = {
  open: boolean;
  align: boolean;
  transpararency: boolean;
};

export default function ModalIndex() {
  // Dynamic
  // const Prompt = dynamic(() => import('@components/modal/PromptModal'));
  // Root State
  const { modalMode, isOpenModal } = useSelector((state: RootState) => state.modal);
  // Ref
  const dimmedRef = useRef<HTMLDivElement>(null);
  // Hooks
  const dispatch = useDispatch();

  const onClickCloseModal = useCallback(
    (e: any) => {
      if (e.target === e.currentTarget) {
        if (modalMode !== 'NOTHING') {
          dispatch({ type: CLOSE_MODAL });
        }
      }
    },
    [isOpenModal, modalMode],
  );

  // render Item
  const renderModal = useCallback(() => {
    switch (modalMode) {
      case 'UNSET':
        return <></>;
      case 'PROMPT':
      // return <Prompt />;
    }
  }, [modalMode]);

  return (
    <Wrapper open={isOpenModal}>
      <DimmedArea
        ref={dimmedRef}
        open={isOpenModal}
        align={modalMode !== 'NOTHING'}
        transpararency={false}
        onClick={e => onClickCloseModal(e)}
      >
        <ModalArea>
          {renderModal()}
          {isOpenModal ? <CloseBox onClick={onClickCloseModal} /> : null}
        </ModalArea>
      </DimmedArea>
    </Wrapper>
  );
}

const Wrapper = styled.div<TWrapper>`
  ${props =>
    props.open &&
    css`
      position: fixed;
      bottom: 0;
      ${({ theme }) => theme.boxSet('100%', '100vh', '0px')};
      z-index: 99;
    `}
`;

const DimmedArea = styled.div<TDimmedArea>`
  ${({ theme }) => theme.flexSet('center', 'center')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  z-index: 99;
  transition: all 0.3s ease-out;
  ${props =>
    props.open &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
    `}
  ${props =>
    props.align &&
    css`
      ${({ theme }) => theme.flexSet('center', 'flex-end')};
    `}
  ${props =>
    props.transpararency &&
    css`
      background-color: transparent;
    `}
`;

const ModalArea = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('center', 'center')};
  width: 100%;
`;

const CloseBox = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  ${({ theme }) => theme.boxSet('28px', '28px', '14px')};
  ${({ theme }) => theme.backgroundSet('/static/icons/common/button-close.svg', 'contain')};
  cursor: pointer;
`;
