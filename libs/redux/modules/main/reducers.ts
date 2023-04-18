import { TPromptList } from '@libs/models/types';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TMainReducer = {
  data: TPromptList | null;
  addQuestion: string | null;
  isLoadingData: boolean;
  isLoadingQuestion: boolean;
  isLoadingCreatePrompt: boolean;
};

export const initialState: TMainReducer = {
  data: null,
  addQuestion: null,
  isLoadingData: false,
  isLoadingQuestion: false,
  isLoadingCreatePrompt: false,
};

const mainReducer = createReducer<TMainReducer, Actions>(initialState, {
  [actions.INIT_THREAD]: state => ({
    ...state,
    data: null,
    addQuestion: null,
    isLoadingData: false,
    isLoadingQuestion: false,
    isLoadingCreatePrompt: false,
  }),

  [actions.SET_STATIC_DATA]: (state, action) => ({
    ...state,
    data: action.payload.promptList,
    addQuestion: action.payload.addQuestion,
  }),

  [actions.POST_GPT_CHAIN_REQUEST]: state => ({
    ...state,
    isLoadingData: true,
  }),
  [actions.POST_GPT_CHAIN_SUCCESS]: (state, action) => ({
    ...state,
    data: state.data !== null ? [...state.data!, action.payload] : [action.payload],
    isLoadingData: false,
  }),
  [actions.POST_GPT_CHAIN_FAILURE]: state => ({
    ...state,
    isLoadingData: false,
  }),

  [actions.POST_GPT_RELATION_REQUEST]: state => ({
    ...state,
    isLoadingQuestion: true,
  }),
  [actions.POST_GPT_RELATION_SUCCESS]: (state, action) => ({
    ...state,
    addQuestion: action.payload,
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
});

export default mainReducer;
