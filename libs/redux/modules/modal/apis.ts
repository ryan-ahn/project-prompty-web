import axios from 'axios';
import * as actions from './actions';
import * as types from './types';

export async function getTestApi(payload: types.TTestReq) {
  try {
    const response = await axios.post(
      `${actions.GET_TEST_URL}`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '내 질문에 답변해주세요.',
          },
          {
            role: 'user',
            content: payload,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAT_GPT_KEY}`,
        },
      },
    );
    const result: types.TTestRes = response.data.choices[0].message.content;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
