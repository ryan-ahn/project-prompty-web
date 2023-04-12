import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as types from './types';
import * as apis from './apis';
import { PayloadAction } from 'typesafe-actions';

function* getTestSaga(action: PayloadAction<'GET_TEST_REQUEST', types.TTestReq>) {
  try {
    const result: types.TTestRes = yield call(apis.getTestApi, action.payload);
    yield put({
      type: actions.GET_TEST_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_TEST_FAILURE,
      error: e,
    });
  }
}
function* watchTest() {
  yield takeLatest(actions.GET_TEST_REQUEST, getTestSaga);
}

export default function* modalSaga() {
  yield all([fork(watchTest)]);
}
