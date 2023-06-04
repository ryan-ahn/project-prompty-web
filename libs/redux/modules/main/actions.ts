import { AxiosError } from 'axios';
import { EmptyAction, createAction, createAsyncAction } from 'typesafe-actions';
import * as types from './types';
import { TSetStaticData } from './types';

const API_HOST = process.env.API_HOST;

export const INIT_THREAD = 'INIT_THREAD';
export const initThread = createAction(INIT_THREAD)();

export const INIT_SUMMARY = 'INIT_SUMMARY';
export const initSummary = createAction(INIT_SUMMARY)();

export const SET_STATIC_DATA = 'SET_STATIC_DATA';
export const setStaticData = createAction(SET_STATIC_DATA)<TSetStaticData>();

export const POST_GPT_RECOMMEND_URL = `${API_HOST}/gpt/recommend`;
export const POST_GPT_RECOMMEND_REQUEST = 'POST_GPT_RECOMMEND_REQUEST';
export const POST_GPT_RECOMMEND_SUCCESS = 'POST_GPT_RECOMMEND_SUCCESS';
export const POST_GPT_RECOMMEND_FAILURE = 'POST_GPT_RECOMMEND_FAILURE';
export const getGptRecommendAction = createAsyncAction(
  POST_GPT_RECOMMEND_REQUEST,
  POST_GPT_RECOMMEND_SUCCESS,
  POST_GPT_RECOMMEND_FAILURE,
)<types.TPostGptRecommendReq, types.TPostGptRecommendRes, AxiosError>();

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

export const POST_GPT_SUMMARY_URL = `${API_HOST}/gpt/summary`;
export const POST_GPT_SUMMARY_REQUEST = 'POST_GPT_SUMMARY_REQUEST';
export const POST_GPT_SUMMARY_SUCCESS = 'POST_GPT_SUMMARY_SUCCESS';
export const POST_GPT_SUMMARY_FAILURE = 'POST_GPT_SUMMARY_FAILURE';
export const postGptSummaryAction = createAsyncAction(
  POST_GPT_SUMMARY_REQUEST,
  POST_GPT_SUMMARY_SUCCESS,
  POST_GPT_SUMMARY_FAILURE,
)<types.TPostGptSummaryReq, types.TPostGptSummaryRes, AxiosError>();

export const POST_PROMPT_URL = `${API_HOST}/prompt`;
export const POST_PROMPT_REQUEST = 'POST_PROMPT_REQUEST';
export const POST_PROMPT_SUCCESS = 'POST_PROMPT_SUCCESS';
export const POST_PROMPT_FAILURE = 'POST_PROMPT_FAILURE';
export const postPromptAction = createAsyncAction(
  POST_PROMPT_REQUEST,
  POST_PROMPT_SUCCESS,
  POST_PROMPT_FAILURE,
)<types.TPostPromptReq, types.TPostPromptRes, AxiosError>();

export const GET_PROMPT_URL = `${API_HOST}/prompt`;
export const GET_PROMPT_REQUEST = 'GET_PROMPT_REQUEST';
export const GET_PROMPT_SUCCESS = 'GET_PROMPT_SUCCESS';
export const GET_PROMPT_FAILURE = 'GET_PROMPT_FAILURE';
export const getPromptAction = createAsyncAction(
  GET_PROMPT_REQUEST,
  GET_PROMPT_SUCCESS,
  GET_PROMPT_FAILURE,
)<types.TGetPromptReq, types.TGetPromptRes, AxiosError>();
