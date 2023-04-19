/**
 * Author : Ryan
 * Date : 2023-04-02
 * Desc : apis
 */

import axios from 'axios';
import * as actions from './actions';
import * as types from './types';

export async function postGptChainApi(payload: types.TPostGptChainReq) {
  try {
    const response = await axios.post(`${actions.POST_GPT_CHAIN_URL}`, payload);
    const result: types.TPostGptChainRes = JSON.parse(JSON.stringify(response.data)).data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function postGptRelationApi(payload: types.TPostGptRelationReq) {
  try {
    const response = await axios.post(`${actions.POST_GPT_RELATION_URL}`, payload);
    const result: types.TPostGptRelationRes = JSON.parse(JSON.stringify(response.data)).data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function postPromptApi(payload: types.TPostPromptReq) {
  try {
    const response = await axios.post(`${actions.POST_PROMPT_URL}`, payload);
    const result: types.TPostPromptRes = JSON.parse(JSON.stringify(response.data)).data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getPromptApi(payload: types.TGetPromptReq) {
  try {
    const response = await axios.get(`${actions.POST_PROMPT_URL}/${payload.id}`);
    const result: types.TGetPromptRes = JSON.parse(JSON.stringify(response.data)).data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
