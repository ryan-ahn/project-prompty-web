import Router from 'next/router';
import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import * as apis from './apis';
import * as types from './types';
import { PayloadAction } from 'typesafe-actions';
import { OPEN_TOAST } from '../toast/actions';

function* postGptRecommendSaga(
  action: PayloadAction<'POST_GPT_RECOMMEND_REQUEST', types.TPostGptRecommendReq>,
) {
  try {
    const result: string = yield call(apis.postGptRecommendApi, action.payload);
    yield put({
      type: actions.POST_GPT_RECOMMEND_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.POST_GPT_RECOMMEND_FAILURE,
      error: e,
    });
  }
}
function* watchGptRecommend() {
  yield takeLatest(actions.POST_GPT_RECOMMEND_REQUEST, postGptRecommendSaga);
}

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

function* postGptSummarySaga(
  action: PayloadAction<'POST_GPT_SUMMARY_REQUEST', types.TPostGptSummaryReq>,
) {
  try {
    const result: types.TPostGptSummaryRes = yield call(apis.postGptSummaryApi, action.payload);
    yield put({
      type: actions.POST_GPT_SUMMARY_SUCCESS,
      payload: result,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.POST_GPT_SUMMARY_FAILURE,
      error: e,
    });
  }
}
function* watchGptSummary() {
  yield takeLatest(actions.POST_GPT_SUMMARY_REQUEST, postGptSummarySaga);
}

function* postPromptSaga(action: PayloadAction<'POST_PROMPT_REQUEST', types.TPostPromptReq>) {
  try {
    const result: types.TPostPromptRes = yield call(apis.postPromptApi, action.payload);
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

function* getPromptSaga(action: PayloadAction<'GET_PROMPT_REQUEST', types.TGetPromptReq>) {
  try {
    const result: types.TGetPromptRes = yield call(apis.getPromptApi, action.payload);
    yield put({
      type: actions.GET_PROMPT_SUCCESS,
      payload: result,
    });
    yield put({
      type: actions.POST_GPT_RELATION_REQUEST,
      payload: { input: result.promptList[0].prompt },
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: actions.GET_PROMPT_FAILURE,
      error: e,
    });
  }
}
function* watchGetPrompt() {
  yield takeLatest(actions.GET_PROMPT_REQUEST, getPromptSaga);
}

export default function* mainSaga() {
  yield all([
    fork(watchGptRecommend),
    fork(watchGptChain),
    fork(watchGptRelation),
    fork(watchGptSummary),
    fork(watchPostPrompt),
    fork(watchGetPrompt),
  ]);
}
