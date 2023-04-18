import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as apis from './apis';
import * as types from './types';
import { PayloadAction } from 'typesafe-actions';

function* postGptChainSaga(
  action: PayloadAction<'POST_GPT_CHAIN_REQUEST', types.TPostGptChainReq>,
) {
  try {
    const result: types.TPostGptChainRes = yield call(apis.postGptChainApi, action.payload);
    yield put({
      type: actions.POST_GPT_CHAIN_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.POST_GPT_CHAIN_FAILURE,
      error: e,
    });
  }
}
function* watchGptChain() {
  yield takeLatest(actions.POST_GPT_CHAIN_REQUEST, postGptChainSaga);
}

function* postGptRelationSaga(
  action: PayloadAction<'POST_GPT_RELATION_REQUEST', types.TPostGptRelationReq>,
) {
  try {
    const result: types.TPostGptRelationRes = yield call(apis.postGptRelationApi, action.payload);
    yield put({
      type: actions.POST_GPT_RELATION_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.POST_GPT_RELATION_FAILURE,
      error: e,
    });
  }
}
function* watchGptRelation() {
  yield takeLatest(actions.POST_GPT_RELATION_REQUEST, postGptRelationSaga);
}

function* postPromptSaga(action: PayloadAction<'POST_PROMPT_REQUEST', types.TPostPromptReq>) {
  try {
    const result: types.TPostPromptRes = yield call(apis.postPromptListApi, action.payload);
    yield put({
      type: actions.POST_PROMPT_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.POST_PROMPT_FAILURE,
      error: e,
    });
  }
}
function* watchPostPrompt() {
  yield takeLatest(actions.POST_PROMPT_REQUEST, postPromptSaga);
}

export default function* mainSaga() {
  yield all([fork(watchGptChain), fork(watchGptRelation), fork(watchPostPrompt)]);
}
