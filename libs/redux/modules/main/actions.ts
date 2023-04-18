import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';
import * as types from './types';
import { TSetStaticData } from './types';

const API_HOST = 'https://api.prompty.im/v1';

export const INIT_THREAD = 'INIT_THREAD';
export const initThread = createAction(INIT_THREAD)();

export const SET_STATIC_DATA = 'SET_STATIC_DATA';
export const setStaticData = createAction(SET_STATIC_DATA)<TSetStaticData>();

export const POST_GPT_CHAIN_URL = `${API_HOST}/gpt/chain`;
export const POST_GPT_CHAIN_REQUEST = 'POST_GPT_CHAIN_REQUEST';
export const POST_GPT_CHAIN_SUCCESS = 'POST_GPT_CHAIN_SUCCESS';
export const POST_GPT_CHAIN_FAILURE = 'POST_GPT_CHAIN_FAILURE';
export const postGptChainAction = createAsyncAction(
  POST_GPT_CHAIN_REQUEST,
  POST_GPT_CHAIN_SUCCESS,
  POST_GPT_CHAIN_FAILURE,
)<types.TPostGptChainReq, types.TPostGptChainRes, AxiosError>();

export const POST_GPT_RELATION_URL = `${API_HOST}/gpt/relation`;
export const POST_GPT_RELATION_REQUEST = 'POST_GPT_RELATION_REQUEST';
export const POST_GPT_RELATION_SUCCESS = 'POST_GPT_RELATION_SUCCESS';
export const POST_GPT_RELATION_FAILURE = 'POST_GPT_RELATION_FAILURE';
export const postGptRelationAction = createAsyncAction(
  POST_GPT_RELATION_REQUEST,
  POST_GPT_RELATION_SUCCESS,
  POST_GPT_RELATION_FAILURE,
)<types.TPostGptRelationReq, types.TPostGptRelationRes, AxiosError>();

export const POST_PROMPT_URL = `${API_HOST}/prompt`;
export const POST_PROMPT_REQUEST = 'POST_PROMPT_REQUEST';
export const POST_PROMPT_SUCCESS = 'POST_PROMPT_SUCCESS';
export const POST_PROMPT_FAILURE = 'POST_PROMPT_FAILURE';
export const postPromptAction = createAsyncAction(
  POST_PROMPT_REQUEST,
  POST_PROMPT_SUCCESS,
  POST_PROMPT_FAILURE,
)<types.TPostPromptReq, types.TPostPromptRes, AxiosError>();
