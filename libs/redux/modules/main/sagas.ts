import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as apis from './apis';
import * as types from './types';
import { PayloadAction } from 'typesafe-actions';

function* getDataSaga(action: PayloadAction<'GET_DATA_REQUEST', types.TGetDataReq>) {
  try {
    const result: types.TGetDataRes = yield call(apis.getDataApi, action.payload);
    yield put({
      type: actions.GET_DATA_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.GET_DATA_FAILURE,
      error: e,
    });
  }
}
function* watchData() {
  yield takeLatest(actions.GET_DATA_REQUEST, getDataSaga);
}

function* getQuestionSaga(action: PayloadAction<'GET_QUESTION_REQUEST', types.TGetQuestionReq>) {
  try {
    const result: types.TGetQuestionRes = yield call(apis.getQuestionApi, action.payload);
    yield put({
      type: actions.GET_QUESTION_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.GET_QUESTION_FAILURE,
      error: e,
    });
  }
}
function* watchQuestion() {
  yield takeLatest(actions.GET_QUESTION_REQUEST, getQuestionSaga);
}

export default function* mainSaga() {
  yield all([fork(watchData), fork(watchQuestion)]);
}
