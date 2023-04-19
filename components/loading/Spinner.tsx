/**
 * Author : Ryan
 * Date : 2022-06-27
 * Desc : Spinner
 */

import styled from 'styled-components';
import { DotSpinner } from '@uiball/loaders';

export default function LoadingSpinner() {
  return (
    <Wrapper>
      <DotSpinner size={40} speed={0.9} color="white" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @keyframes pulse {
    0%,
    100% {
      transform: scale(0);
      opacity: 0.5;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
