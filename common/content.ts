export const CONTENT_PAGE = {
  gpt: {
    title: {
      title: 'Chat Completions'
    },
    system: {
      label: 'System Model',
      placeholder: '예: 여행지를 추천해주는 도우미',
    },
    assistant: {
      label: 'Assistant',
      placeholder1: 'prompt',
      placeholder2: 'answer',
    },
    temperature: {
      label: 'Temperature',
      placeholder: '0에서 10사이',
    },
    prompt: {
      label: 'Prompt',
      placeholder: '예: 여행지를 추천해줘!',
    },
    response: {
      label: 'Answer',
    },
  },
  signin: {
    title: {
      title: 'Login in your account'
    },
    social: {
      kakao: 'Kakao',
      google: 'Google'
    },
    description: {
      agree: '프롬티의 제3자 정보제공 정책에 동의합니다.',
      policy: '개인정보 수집 및 이용약관'
    }
  },
  main: {
    bottom: {
      text: '무엇이든 물어보세요! AI가 모두 답변해줍니다.\n연결된 AI 답변을 통해 지식을 확장시켜보아요. 다만, 질문에 개인 정보를 입력하지 마십시오!',
      policy: '개인정보 처리방침',
      service: '서비스 이용약관'
    }
  }
};
