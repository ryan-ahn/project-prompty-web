/**
 * Author : Ryan
 * Date : 2023-05-21
 * Desc : ThreadShareModal
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@libs/redux/modules';
import { kakaoShare } from '@libs/utils/kakaoShare';
import { linkShare } from '@libs/utils/linkShare';
import { CLOSE_MODAL } from '@libs/redux/modules/modal/actions';
import { OPEN_TOAST } from '@libs/redux/modules/toast/actions';

export default function ThreadShareModal() {
  // Root State
  const { shareLink, shareTitle } = useSelector((state: RootState) => state.main);
  // Hooks
  const dispatch = useDispatch();

  const onClickKakaoShare = useCallback(() => {
    if (shareLink && shareTitle) {
      kakaoShare(shareLink, shareTitle);
    }
  }, [shareLink, shareTitle]);

  const onClickLinkShare = useCallback(() => {
    linkShare();
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: OPEN_TOAST, payload: '링크를 복사했습니다.' });
  }, [shareLink, shareTitle]);

  return (
    <Wrapper>
      <HeaderBlock>
        <p>공유하기</p>
      </HeaderBlock>
      <LinkBlock>
        <input
          id="shareLinkId"
          value={`${process.env.PUBLIC_HOST}/threads?prompt=${shareLink}`}
        ></input>
      </LinkBlock>
      <ShareBlock>
        <LinkBox onClick={onClickLinkShare}>
          <img src="static/share-link.png" alt="button" />
        </LinkBox>
        <KakaoBox onClick={onClickKakaoShare}>
          <img src="static/kakao.png" alt="button" />
        </KakaoBox>
      </ShareBlock>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 15px 20px;
`;

const HeaderBlock = styled.div`
  margin-bottom: 15px;
  & > p {
    ${({ theme }) => theme.fontSet(20, 700, 32)};
  }
`;

const LinkBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '25px', '5px')};
  margin-bottom: 15px;
  padding: 0 20px;
  background-color: #303030;
  overflow: hidden;
  & > input {
    display: -webkit-box;
    color: #c1c1c1;
    ${({ theme }) => theme.fontSet(13, 300, 20)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const ShareBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const LinkBox = styled.div`
  ${({ theme }) => theme.boxSet('40px', '40px', '50%')};
  background-color: #303030;
  margin-right: 10px;
  padding: 10px;
  cursor: pointer;
  & > img {
    ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  }
`;

const KakaoBox = styled.div`
  ${({ theme }) => theme.boxSet('40px', '40px', '0px')};
  cursor: pointer;
  & > img {
    ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  }
`;
