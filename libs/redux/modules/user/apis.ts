import axios from 'axios';
import * as actions from './actions';
import * as types from './types';

export async function postSignInApi(payload: types.TSignInReq) {
  try {
    const response = await axios.post(`${actions.POST_SIGN_IN_URL}`, payload);
    const result: types.TSignInRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
