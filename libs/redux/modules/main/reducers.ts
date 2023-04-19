import { TPromptList } from '@libs/models/types';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TMainReducer = {
  recommend: string | null;
  chain: TPromptList | null;
  relation: string | null;
  isLoadingChain: boolean;
  isLoadingQuestion: boolean;
  isLoadingCreatePrompt: boolean;
};

export const initialState: TMainReducer = {
  recommend: null,
  chain: null,
  relation: null,
  isLoadingChain: false,
  isLoadingQuestion: false,
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

  [actions.SET_STATIC_DATA]: (state, action) => ({
    ...state,
    chain: action.payload.promptList,
    relation: action.payload.relation,
  }),

  [actions.GET_GPT_RECOMMEND_REQUEST]: state => ({
    ...state,
    isLoadingRecommend: true,
  }),
  [actions.GET_GPT_RECOMMEND_SUCCESS]: (state, action) => ({
    ...state,
    recommend: action.payload,
    isLoadingRecommend: false,
  }),
  [actions.GET_GPT_RECOMMEND_FAILURE]: state => ({
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

  [actions.POST_PROMPT_REQUEST]: state => ({
    ...state,
    isLoadingCreatePrompt: true,
  }),
  [actions.POST_PROMPT_SUCCESS]: (state, action) => ({
    ...state,
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
