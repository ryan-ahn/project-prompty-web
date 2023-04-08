/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : apis
 */

import axios from 'axios';
import * as actions from './actions';
import * as types from './types';
import { TMessageRole } from './types';

export async function getDataApi(payload: types.TGetDataReq) {
  // Role 설정
  const messages: Array<TMessageRole> = [
    {
      role: 'system',
      content: '당신은 내 질문에 답변해주는 도우미입니다.',
    },
  ];
  if (payload.assistant && payload.assistant.length > 0) {
    for (let i = 0; i < payload.assistant.length; i++) {
      messages.push({ role: 'user', content: payload.assistant[i].prompt });
      messages.push({ role: 'assistant', content: payload.assistant[i].answer });
    }
  }
  messages.push({
    role: 'user',
    content: `${payload.input}. 이 질문에 답변해 주세요.`,
  });
  // Fetch
  try {
    const response = await axios.post(
      `${actions.GET_DATA_URL}`,
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAT_GPT_KEY}`,
        },
      },
    );
    const result: types.TGetDataRes = {
      prompt: payload.input,
      answer: response.data.choices[0].message.content,
    };
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getQuestionApi(payload: types.TGetQuestionReq) {
  // Role 설정
  const messages: Array<TMessageRole> = [
    {
      role: 'system',
      content: '당신은 내 질문에 답변해주는 도우미입니다.',
    },
  ];
  if (payload.assistant && payload.assistant.length > 0) {
    for (let i = 0; i < payload.assistant.length; i++) {
      messages.push({ role: 'user', content: payload.assistant[i].prompt });
      messages.push({ role: 'assistant', content: payload.assistant[i].answer });
    }
  }
  messages.push({
    role: 'user',
    content: `"${payload.input}"라는 질문 또는 요청과 관련 있는 주제 세 가지를 보여주세요. 질문 형태로 말해주시고 다른 말은 하지 말아주세요. 각각의 질문은 개행문자로 줄바꿈 처리 해주세요.`,
  });
  // Fetch
  try {
    const response = await axios.post(
      `${actions.GET_DATA_URL}`,
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAT_GPT_KEY}`,
        },
      },
    );
    const result: types.TGetQuestionRes = response.data.choices[0].message.content;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
