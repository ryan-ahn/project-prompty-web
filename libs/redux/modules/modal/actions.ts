/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : actions
 */

import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';
import * as types from './types';

const API_HOST = 'https://api.openai.com/v1';

export const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = createAction(OPEN_MODAL)<types.TModalMode>();

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = createAction(CLOSE_MODAL)();

export const OPEN_PROMPT_MODAL = 'OPEN_PROMPT_MODAL';
export const openPromptModal = createAction(OPEN_PROMPT_MODAL)<types.TPromptModal>();

export const OPEN_CHAT_GPT_MODAL = 'OPEN_CHAT_GPT_MODAL';
export const openChatGptModal = createAction(OPEN_CHAT_GPT_MODAL)<string>();

export const CLOSE_GPT = 'CLOSE_GPT';
export const closeGpt = createAction(CLOSE_GPT)();

export const GET_TEST_URL = `${API_HOST}/chat/completions`;
export const GET_TEST_REQUEST = 'GET_TEST_REQUEST';
export const GET_TEST_SUCCESS = 'GET_TEST_SUCCESS';
export const GET_TEST_FAILURE = 'GET_TEST_FAILURE';
export const getCarsAction = createAsyncAction(
  GET_TEST_REQUEST,
  GET_TEST_SUCCESS,
  GET_TEST_FAILURE,
)<types.TTestReq, types.TTestRes, AxiosError>();
