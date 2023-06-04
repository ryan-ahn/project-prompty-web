import { TPromptList } from '@libs/models/types';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TMainReducer = {
  recommend: string | null;
  chain: TPromptList | null;
  relation: string | null;
  shareLink: string | null;
  shareTitle: string | null;
  summary: string | null;
  isLoadingRecommend: boolean;
  isLoadingChain: boolean;
  isLoadingQuestion: boolean;
  isLoadingSummary: boolean;
  isLoadingCreatePrompt: boolean;
};

export const initialState: TMainReducer = {
  recommend: null,
  chain: null,
  relation: null,
  shareLink: null,
  shareTitle: null,
  summary: null,
  isLoadingRecommend: false,
  isLoadingChain: false,
  isLoadingQuestion: false,
  isLoadingSummary: false,
  isLoadingCreatePrompt: false,
};

const mainReducer = createReducer<TMainReducer, Actions>(initialState, {
  [actions.INIT_THREAD]: state => ({
    ...state,
    recommend: null,
    chain: null,
    relation: null,
    isLoadingRecommend: false,
    isLoadingChain: false,
    isLoadingQuestion: false,
    isLoadingCreatePrompt: false,
  }),
  [actions.INIT_SUMMARY]: state => ({
    ...state,
    summary: null,
    isLoadingSummary: false,
  }),

  [actions.SET_STATIC_DATA]: (state, action) => ({
    ...state,
    chain: action.payload.promptList,
    relation: action.payload.relation,
  }),

  [actions.POST_GPT_RECOMMEND_REQUEST]: state => ({
    ...state,
    isLoadingRecommend: true,
  }),
  [actions.POST_GPT_RECOMMEND_SUCCESS]: (state, action) => ({
    ...state,
    recommend: action.payload,
    isLoadingRecommend: false,
  }),
  [actions.POST_GPT_RECOMMEND_FAILURE]: state => ({
    ...state,
    isLoadingRecommend: false,
  }),

  [actions.POST_GPT_CHAIN_REQUEST]: state => ({
    ...state,
    isLoadingChain: true,
  }),
  [actions.POST_GPT_CHAIN_SUCCESS]: (state, action) => ({
    ...state,
    chain: state.chain !== null ? [...state.chain!, action.payload] : [action.payload],
    isLoadingChain: false,
  }),
  [actions.POST_GPT_CHAIN_FAILURE]: state => ({
    ...state,
    isLoadingChain: false,
  }),

  [actions.POST_GPT_RELATION_REQUEST]: state => ({
    ...state,
    isLoadingQuestion: true,
  }),
  [actions.POST_GPT_RELATION_SUCCESS]: (state, action) => ({
    ...state,
    relation: action.payload,
    isLoadingQuestion: false,
  }),
  [actions.POST_GPT_RELATION_FAILURE]: state => ({
    ...state,
    isLoadingQuestion: false,
  }),

  [actions.POST_GPT_SUMMARY_REQUEST]: state => ({
    ...state,
    isLoadingSummary: true,
  }),
  [actions.POST_GPT_SUMMARY_SUCCESS]: (state, action) => ({
    ...state,
    summary: action.payload,
    isLoadingSummary: false,
  }),
  [actions.POST_GPT_SUMMARY_FAILURE]: state => ({
    ...state,
    isLoadingSummary: false,
  }),

  [actions.POST_PROMPT_REQUEST]: state => ({
    ...state,
    isLoadingCreatePrompt: true,
  }),
  [actions.POST_PROMPT_SUCCESS]: (state, action) => ({
    ...state,
    shareTitle: action.payload.title,
    shareLink: action.payload._id,
    isLoadingCreatePrompt: false,
  }),
  [actions.POST_PROMPT_FAILURE]: state => ({
    ...state,
    isLoadingCreatePrompt: false,
  }),

  [actions.GET_PROMPT_REQUEST]: state => ({
    ...state,
    isLoadingCreatePrompt: true,
  }),
  [actions.GET_PROMPT_SUCCESS]: (state, action) => ({
    ...state,
    chain: action.payload.promptList,
    isLoadingCreatePrompt: false,
  }),
  [actions.GET_PROMPT_FAILURE]: state => ({
    ...state,
    isLoadingCreatePrompt: false,
  }),
});

export default mainReducer;
