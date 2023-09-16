import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { CONTENT_PAGE } from '@common/content';

export default function index() {
  const [system, setSystem] = useState<any[]>([{ id: 0, text: '' }]);
  const [assistant, setAssistant] = useState<any[]>([{ question: '', answer: '' }]);
  const [temperature, setTemperature] = useState(7);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  // variable
  const systemLabel = CONTENT_PAGE.gpt.system.label;
  const systemPlaceholder = CONTENT_PAGE.gpt.system.placeholder;
  const assistantLabel = CONTENT_PAGE.gpt.assistant.label;
  const assistantPrompt = CONTENT_PAGE.gpt.assistant.placeholder1;
  const assistantAnswer = CONTENT_PAGE.gpt.assistant.placeholder2;
  const temperatureLabel = CONTENT_PAGE.gpt.temperature.label;
  const temperaturePlaceholder = CONTENT_PAGE.gpt.temperature.placeholder;
  const promptLabel = CONTENT_PAGE.gpt.prompt.label;
  const promptPlaceHolder = CONTENT_PAGE.gpt.prompt.placeholder;
  const responseLabel = CONTENT_PAGE.gpt.response.label;
  // Function
  const onClickPlus = (type: string) => {
    if (type === 'system') {
      setSystem([...system, {id: system.length, text: ''}])
    }
    if (type === 'assistant') {
      setAssistant([...assistant, { question: '', answer: ''}]);
    }
  };

  const onChangeSystem = (e: any, index: number) => {
    const copiedSystem = [...system];
    copiedSystem[index].text = e.target.value;
    setSystem(copiedSystem)
  }

  const onChangeAssistant = (e: any, index: number, type: string) => {
    const copiedAssistant = [...assistant];
    copiedAssistant[index][type] = e.target.value;
    setAssistant(copiedAssistant);
  };

  const onClickSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/v1/pilot/chat/completions',
        { system, assistant, temperature : temperature / 10 , prompt },
      );
      setLoading(false);
      setResult(response.data.data.answer);
    } catch (e: any) {
      setLoading(false);
      throw Error(e.message);
    }
  };
  return (
    <Wrapper>
      <HeaderContainer>
        <h1>Chat Completions</h1>
      </HeaderContainer>
      <ContentContainer>
        <PromptContainer>
          <InputBox>
            <p>{systemLabel}</p>
            {system.map((item, index) => 
              <div key={index}>
              <input
                value={item.text}
                placeholder={systemPlaceholder}
                onChange={(e: any) => onChangeSystem(e, index)}
              />
                </div>
            )}
            <PlusButtonBox onClick={() => onClickPlus('system')}>
              <p>+</p>
            </PlusButtonBox>
          </InputBox>
          <InputBox>
            <p>{assistantLabel}</p>
            {assistant.map((_, index: number) => (
              <div key={index}>
                <input
                  placeholder={assistantPrompt}
                  onChange={e => onChangeAssistant(e, index, 'question')}
                />
                <input
                  placeholder={assistantAnswer}
                  onChange={e => onChangeAssistant(e, index, 'answer')}
                />
              </div>
            ))}
            <PlusButtonBox onClick={() => onClickPlus('assistant')}>
              <p>+</p>
            </PlusButtonBox>
          </InputBox>
          <InputBox>
            <p>{temperatureLabel}</p>
            <div>
              <input
                value={temperature}
                placeholder={temperaturePlaceholder}
                onChange={(e: any) => setTemperature(Number(e.target.value))}
              />
            </div>
          </InputBox>
          <InputBox>
            <p>{promptLabel}</p>
            <div>
              <input
                value={prompt}
                placeholder={promptPlaceHolder}
                onChange={(e: any) => setPrompt(e.target.value)}
              />
            </div>
          </InputBox>
          <SubmitButtonBox onClick={onClickSubmit}>
            <p>전송</p>
          </SubmitButtonBox>
        </PromptContainer>
        <AnswerContainer>
          <h2>{responseLabel}</h2>
          <p>{loading ? 'GPT 결과 값 불러오는 중!!!' : result}</p>
        </AnswerContainer>
      </ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.colorSet('white', '#252525')};
`;

const HeaderContainer = styled.div`
  ${({ theme }) => theme.boxSet('100%', '150px', '0px')};
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  & > h1 {
    ${({ theme }) => theme.fontSet(50, 500, 70)};
  }
`;

const ContentContainer = styled.div`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'calc(100vh - 150px)', '0px')};
  padding: 50px;
  overflow-y: scroll;
  gap: 100px;
`;

const PromptContainer = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  gap: 30px;
  & > h1 {
    ${({ theme }) => theme.fontSet(50, 700, 70)};
    white-space: pre-wrap;
    text-align: center;
  }
  & > p {
    ${({ theme }) => theme.fontSet(25, 300, 23)};
  }
`;

const AnswerContainer = styled.div`
  & > h2 {
    ${({ theme }) => theme.fontSet(30, 700, 70)};
    white-space: pre-wrap;
    text-align: center;
  }
  & > p {
    ${({ theme }) => theme.boxSet('400px', 'auto', '20px')};
    min-height: 300px;
    padding: 30px;
    ${({ theme }) => theme.colorSet('black', 'white')};
    ${({ theme }) => theme.fontSet(15, 400, 24)};
  }
`;

const InputBox = styled.div`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  gap: 10px;
  & > p {
    ${({ theme }) => theme.fontSet(24, 500, 32)};
  }
  & > div {
    ${({ theme }) => theme.flexSet('center', 'center', 'column')};
    gap: 10px;
    & > input {
      ${({ theme }) => theme.boxSet('500px', '100%', '20px')};
      padding: 10px 20px;
      ${({ theme }) => theme.colorSet('black', 'white')}
      ${({ theme }) => theme.fontSet(18, 400, 24)};
    }
  }
`;

const PlusButtonBox = styled.button`
  ${({ theme }) => theme.boxSet('100%', '100%', '20px')};
  ${({ theme }) => theme.colorSet('white', 'black')};
  cursor: pointer;
  & > p {
    ${({ theme }) => theme.fontSet(24, 700, 32)};
  }
`;

const SubmitButtonBox = styled.button`
  ${({ theme }) => theme.boxSet('100%', '100%', '20px')};
  ${({ theme }) => theme.colorSet('white', 'black')};
  cursor: pointer;
  & > p {
    padding: 15px 25px;
  }
`;
