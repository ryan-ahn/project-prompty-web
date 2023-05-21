import axios from 'axios';
import * as actions from './actions';
import * as types from './types';
import { addUserAccessToken } from '@libs/utils/sessionHelper';

export async function getKakaoCallbackApi(payload: types.TKakaoCallbackReq) {
  try {
    const response = await axios.get(`${actions.GET_KAKAO_CALLBACK_URL}/${payload.code}`);
    const result: types.TKakaoCallbackRes = response.data.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getTokenAccessApi() {
  try {
    const response = await axios.get(`${actions.GET_TOKEN_ACCESS_URL}`, {
      headers: addUserAccessToken(),
    });
    const result: types.TTokenAccessRes = response.data.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
