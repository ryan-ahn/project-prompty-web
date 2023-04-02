/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : apis
 */

import axios from 'axios';
import * as actions from './actions';
import * as types from './types';

export async function getDataApi(payload: types.TGetDataReq) {
  try {
    const response = await axios.post(
      `${actions.GET_DATA_URL}`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '당신은 내 질문에 답변해주는 도우미입니다.',
          },
          {
            role: 'user',
            content: `${payload.input}. 이 질문에 답변해 주세요.`,
          },
        ],
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
  try {
    const response = await axios.post(
      `${actions.GET_DATA_URL}`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '당신은 내 질문에 답변을 해주는 도우미입니다.',
          },
          {
            role: 'user',
            content: `${payload.input}라는 질문 또는 요청과 관련된, 추가로 생각해 봐야 할 질문 세 가지만 보여주세요. 각각의 질문은 줄바꿈 처리 해주세요.(개행문자\n은 한개만 사용해주세요.)`,
          },
        ],
        temperature: 0.5,
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
