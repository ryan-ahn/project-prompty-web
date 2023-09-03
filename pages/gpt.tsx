/**
 * Author : Ryan
 * Date : 2023-09-01
 * Desc : gpt
 */

import styled from 'styled-components';
import GptContainer from '@containers/gpt'

export default function gpt() {
  return (
    <Wrapper>
      <GptContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
${({ theme }) => theme.boxSet('100%', '100%', '0px')};
`;