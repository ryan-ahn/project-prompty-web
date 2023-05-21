export const kakaoShare = (shareLink, title) => {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: '#프롬프트 #인공지능 #AI도우미 #AI지식인',
      imageUrl: 'https://prompty-image.s3.ap-northeast-2.amazonaws.com/prompty.png',
      link: {
        mobileWebUrl: shareLink,
        webUrl: shareLink,
      },
    },
    social: {
      likeCount: 286,
      commentCount: 45,
      sharedCount: 845,
    },
    buttons: [
      {
        title: '답변보고 질문하기!',
        link: {
          mobileWebUrl: shareLink,
          webUrl: shareLink,
        },
      },
    ],
  });
};
