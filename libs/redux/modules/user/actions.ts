import { AxiosError } from 'axios';
import { createAction, createAsyncAction, EmptyAction } from 'typesafe-actions';
import * as types from './types';

const API_HOST = 'http://localhost:8000/api/v2';

export const CHECK_ACCESS = 'CHECK_ACCESS';
export const checkAccess = createAction(CHECK_ACCESS)();

export const POST_SIGN_IN_URL = `${API_HOST}/login/`;
export const POST_SIGN_IN_REQUEST = 'POST_SIGN_IN_REQUEST';
export const POST_SIGN_IN_SUCCESS = 'POST_SIGN_IN_SUCCESS';
export const POST_SIGN_IN_FAILURE = 'POST_SIGN_IN_FAILURE';
export const postSignInAction = createAsyncAction(
  POST_SIGN_IN_REQUEST,
  POST_SIGN_IN_SUCCESS,
  POST_SIGN_IN_FAILURE,
)<types.TSignInReq, types.TSignInRes, AxiosError>();
