import { AxiosError } from 'axios';
import { createAction, createAsyncAction, EmptyAction } from 'typesafe-actions';
import * as types from './types';

const API_HOST = process.env.API_HOST;

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = createAction(SIGN_OUT)();

export const GET_KAKAO_CALLBACK_URL = `${API_HOST}/auth/kakao/callback`;
export const GET_KAKAO_CALLBACK_REQUEST = 'GET_KAKAO_CALLBACK_REQUEST';
export const GET_KAKAO_CALLBACK_SUCCESS = 'GET_KAKAO_CALLBACK_SUCCESS';
export const GET_KAKAO_CALLBACK_FAILURE = 'GET_KAKAO_CALLBACK_FAILURE';
export const getKakaoCallbackAction = createAsyncAction(
  GET_KAKAO_CALLBACK_REQUEST,
  GET_KAKAO_CALLBACK_SUCCESS,
  GET_KAKAO_CALLBACK_FAILURE,
)<types.TKakaoCallbackReq, types.TKakaoCallbackRes, AxiosError>();

export const GET_TOKEN_ACCESS_URL = `${API_HOST}/auth/token/access`;
export const GET_TOKEN_ACCESS_REQUEST = 'GET_TOKEN_ACCESS_REQUEST';
export const GET_TOKEN_ACCESS_SUCCESS = 'GET_TOKEN_ACCESS_SUCCESS';
export const GET_TOKEN_ACCESS_FAILURE = 'GET_TOKEN_ACCESS_FAILURE';
export const getTokenAccessAction = createAsyncAction(
  GET_TOKEN_ACCESS_REQUEST,
  GET_TOKEN_ACCESS_SUCCESS,
  GET_TOKEN_ACCESS_FAILURE,
)<EmptyAction<any>, types.TTokenAccessRes, AxiosError>();
