import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';
import * as types from './types';
import { TSetStaticData } from './types';

const API_HOST = 'https://api.prompty.im/v1';

export const INIT_THREAD = 'INIT_THREAD';
export const initThread = createAction(INIT_THREAD)();

export const SET_STATIC_DATA = 'SET_STATIC_DATA';
export const setStaticData = createAction(SET_STATIC_DATA)<TSetStaticData>();

export const GET_DATA_URL = `${API_HOST}/gpt/chain`;
export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';
export const getDataAction = createAsyncAction(
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
)<types.TGetDataReq, types.TGetDataRes, AxiosError>();

export const GET_QUESTION_URL = `${API_HOST}/gpt/relation`;
export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE';
export const getQuestionAction = createAsyncAction(
  GET_QUESTION_REQUEST,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILURE,
)<types.TGetQuestionReq, types.TGetQuestionRes, AxiosError>();
