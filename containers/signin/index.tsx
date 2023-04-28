/**
 * Author : Ryan
 * Date : 2023-04-24
 * Desc : index
 */

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function index() {
  // Hooks
  const router = useRouter();

  const onClickRouteToPolicy = useCallback(() => {
    router.push('/policy');
  }, []);

  return (
    <Wrapper>
      <ContentBlock>
        <LogoBox>
          <img src="/static/logo.png" alt="logo" />
          <p>Login in your account</p>
        </LogoBox>
        <SocialLoginButtonBox
          onClick={() => signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_HOST })}
        >
          <img src="/static/google.png" alt="button"></img>
          <p>Google</p>
        </SocialLoginButtonBox>
        <SocialLoginButtonBox>
          <img src="/static/kakao.png" alt="button"></img>
          <p>Kakao</p>
        </SocialLoginButtonBox>
        <Line />
        <DescriptionBox>
          <p>프롬티의 제3자 정보제공 정책에 동의합니다.</p>
          <p onClick={onClickRouteToPolicy}>개인정보 수집 및 이용약관</p>
        </DescriptionBox>
      </ContentBlock>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100vw;
  height: 100vh;
`;

const ContentBlock = styled.div`
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  max-width: 400px;
  margin: 25px;
  padding: 45px 25px;
  border: 1px solid #606060;
`;

const LogoBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  width: 100%;
  margin-bottom: 30px;
  & > img {
    width: 65px;
  }
  & > p {
    color: #009ffc;
    ${({ theme }) => theme.fontSet(28, 700, 40)};
  }
`;

const SocialLoginButtonBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '55px', '12px')};
  margin: 20px 0;
  border: 1px solid #606060;
  background-color: #202020;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  & > img {
    width: 25px;
    margin-right: 10px;
  }
  & > p {
    ${({ theme }) => theme.fontSet(22, 400, 35)};
    margin-bottom: 2px;
  }
`;

const Line = styled.div`
  ${({ theme }) => theme.boxSet('100%', '1px', '0px')};
  border-bottom: 1px solid #606060;
`;

const DescriptionBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  margin-top: 15px;
  & > p:nth-child(1) {
    color: #606060;
    ${({ theme }) => theme.fontSet(12, 400, 20)};
  }
  & > p:nth-child(2) {
    color: #606060;
    ${({ theme }) => theme.fontSet(12, 400, 20)};
    cursor: pointer;
  }
`;
