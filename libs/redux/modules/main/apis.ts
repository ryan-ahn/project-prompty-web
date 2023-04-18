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
  try {
    const response = await axios.post(`${actions.GET_DATA_URL}`, payload);
    const result: types.TGetQuestionRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getQuestionApi(payload: types.TGetQuestionReq) {
  try {
    const response = await axios.post(`${actions.GET_QUESTION_URL}`, payload);
    const result: types.TGetQuestionRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}
