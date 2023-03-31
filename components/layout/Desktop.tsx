/**
 * Author : Ryan
 * Date : 2023-03-25
 * Desc : Desktop
 */

import styled from 'styled-components';

type TProps = {
  children: React.ReactElement;
};

export default function DesktopLayout({ children }: TProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('500px', '100%', '0px')};
`;
