import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';
import * as types from './types';

const API_HOST = 'https://api.openai.com/v1';

export const CLOSE_GPT = 'CLOSE_GPT';
export const closeModal = createAction(CLOSE_GPT)();

export const GET_TEST_URL = `${API_HOST}/chat/completions`;
export const GET_TEST_REQUEST = 'GET_TEST_REQUEST';
export const GET_TEST_SUCCESS = 'GET_TEST_SUCCESS';
export const GET_TEST_FAILURE = 'GET_TEST_FAILURE';
export const getCarsAction = createAsyncAction(
  GET_TEST_REQUEST,
  GET_TEST_SUCCESS,
  GET_TEST_FAILURE,
)<types.TTestReq, types.TTestRes, AxiosError>();
