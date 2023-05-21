/**
 * Author : Ryan
 * Date : 2023-04-24
 * Desc : index
 */

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IProps } from 'pages/signin';
import { useDispatch } from 'react-redux';
import { GET_KAKAO_CALLBACK_REQUEST } from '@libs/redux/modules/user/actions';

export default function index({ code }: IProps) {
  // Hooks
  const router = useRouter();
  const dispatch = useDispatch();

  const onClickRouteToPolicy = useCallback(() => {
    router.push('/policy');
  }, []);

  useEffect(() => {
    if (code !== null) {
      dispatch({
        type: GET_KAKAO_CALLBACK_REQUEST,
        payload: {
          code: code,
        },
      });
    }
  }, [code]);

  return (
    <Wrapper>
      <ContentBlock>
        <LogoBox>
          <img src="/static/logo.png" alt="logo" />
          <p>Login in your account</p>
        </LogoBox>
        <SocialLoginButtonBox href="http://localhost:8080/v1/auth/kakao/init">
          <img src="/static/kakao.png" alt="button"></img>
          <p>Kakao</p>
        </SocialLoginButtonBox>
        <SocialLoginButtonBox>
          <img src="/static/google.png" alt="button"></img>
          <p>Google</p>
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

const SocialLoginButtonBox = styled.a`
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
