import Router from 'next/router';
import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import jsCookie from 'js-cookie';
import * as actions from './actions';
import * as types from './types';
import * as apis from './apis';
import { OPEN_TOAST } from '../toast/actions';

function* getKakaoCallbackSaga(
  action: PayloadAction<'GET_KAKAO_CALLBACK_REQUEST', types.TKakaoCallbackReq>,
) {
  try {
    const result: types.TKakaoCallbackRes = yield call(apis.getKakaoCallbackApi, action.payload);
    yield put({
      type: actions.GET_KAKAO_CALLBACK_SUCCESS,
      payload: result,
    });
    jsCookie.set('access', result.token.accessToken);
    yield call(Router.push, '/');
  } catch (e) {
    yield put({
      type: actions.GET_KAKAO_CALLBACK_FAILURE,
      error: e,
    });
    yield put({
      type: OPEN_TOAST,
      payload: '로그인 정보를 다시 확인해 주세요',
    });
  }
}
function* watchGetKakaoCallback() {
  yield takeLatest(actions.GET_KAKAO_CALLBACK_REQUEST, getKakaoCallbackSaga);
}

function* getTokenAccessSaga() {
  try {
    const result: types.TKakaoCallbackRes = yield call(apis.getTokenAccessApi);
    yield put({
      type: actions.GET_TOKEN_ACCESS_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_TOKEN_ACCESS_FAILURE,
      error: e,
    });
  }
}
function* watchGetTokenAccess() {
  yield takeLatest(actions.GET_TOKEN_ACCESS_REQUEST, getTokenAccessSaga);
}

export default function* userSaga() {
  yield all([fork(watchGetKakaoCallback), fork(watchGetTokenAccess)]);
}
