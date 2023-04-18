/**
 * Author : Ryan
 * Date : 2022-05-20
 * Desc : index
 */

import useToast from '@libs/hooks/useToast';
import styled, { css, keyframes } from 'styled-components';

type TProps = {
  text: string;
  inverted: boolean;
};

type TWrapper = {
  attrVisible: boolean;
};

export default function Toast({ text, inverted }: TProps) {
  const { closeToast } = useToast();
  return (
    <Wrapper attrVisible={inverted}>
      <Block attrVisible={inverted} onClick={closeToast}>
        <p>{text}</p>
      </Block>
    </Wrapper>
  );
}

const fadeInUp = keyframes`
    0% {
        opacity: 0;
        visibility: hidden;
        transform: translate3d(0,-30px,0)
    }
    25% {
        transform: translate3d(0,0,0);
        opacity: 1;
        visibility: visible;
    }
    75% {
        transform: translate3d(0,0,0);
        opacity: 1;
        visibility: visible;
    }
    100%{
        transform: translate3d(0,-30px,0);
        opacity: 0;
        visibility: hidden;
    }
`;

const Wrapper = styled.aside<TWrapper>`
  position: fixed;
  top: 30px;
  z-index: 0;
  visibility: hidden;
  border-radius: 25px;
  ${props =>
    props.attrVisible &&
    css`
      z-index: 99;
      visibility: visible;
    `}
`;

const Block = styled.div<TWrapper>`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 200px;
  height: 40px;
  border-radius: 30px;
  padding: 0 30px;
  cursor: pointer;
  color: black;
  background: #ffffff;
  box-shadow: 6px 6px 10px rgba(156, 153, 153, 0.2);
  ${props =>
    props.attrVisible &&
    css`
      animation: ${fadeInUp} 2s both;
    `}
`;
const CheckIcon = styled.div`
  width: 19.5px;
  height: 23.31px;
  background-image: url('/static/icons/common/check.svg');
  background-size: 100% 100%;
  margin: 0 22.5px 0 0;
`;
