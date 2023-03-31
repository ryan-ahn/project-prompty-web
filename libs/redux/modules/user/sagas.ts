import Router from 'next/router';
import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import jsCookie from 'js-cookie';
import * as actions from './actions';
import * as types from './types';
import * as apis from './apis';
import { OPEN_TOAST } from '../toast/actions';

function* postSignInSaga(action: PayloadAction<'POST_SIGN_IN_REQUEST', types.TSignInReq>) {
  try {
    const result: types.TSignInRes = yield call(apis.postSignInApi, action.payload);
    yield put({
      type: actions.POST_SIGN_IN_SUCCESS,
      payload: result,
    });
    jsCookie.set('access', result.token);
    yield call(Router.push, '/');
  } catch (e) {
    yield put({
      type: actions.POST_SIGN_IN_FAILURE,
      error: e,
    });
    yield put({
      type: OPEN_TOAST,
      payload: '로그인 정보를 다시 확인해 주세요',
    });
  }
}
function* watchPostSignIn() {
  yield takeLatest(actions.POST_SIGN_IN_REQUEST, postSignInSaga);
}

export default function* userSaga() {
  yield all([fork(watchPostSignIn)]);
}
