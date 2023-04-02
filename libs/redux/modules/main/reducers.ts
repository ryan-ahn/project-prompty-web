import { TPromptList } from '@libs/models/types';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TMainReducer = {
  data: TPromptList | null;
  addQuestion: string | null;
  isLoadingData: boolean;
  isLoadingQuestion: boolean;
};

export const initialState: TMainReducer = {
  data: null,
  addQuestion: null,
  isLoadingData: false,
  isLoadingQuestion: false,
};

const mainReducer = createReducer<TMainReducer, Actions>(initialState, {
  [actions.INIT_THREAD]: state => ({
    ...state,
    data: null,
    addQuestion: null,
    isLoadingData: false,
    isLoadingQuestion: false,
  }),

  [actions.SET_STATIC_DATA]: (state, action) => ({
    ...state,
    data: action.payload.promptList,
    addQuestion: action.payload.addQuestion,
  }),

  [actions.GET_DATA_REQUEST]: state => ({
    ...state,
    isLoadingData: true,
  }),
  [actions.GET_DATA_SUCCESS]: (state, action) => ({
    ...state,
    data: state.data !== null ? [...state.data!, action.payload] : [action.payload],
    isLoadingData: false,
  }),
  [actions.GET_DATA_FAILURE]: state => ({
    ...state,
    isLoadingData: false,
  }),

  [actions.GET_QUESTION_REQUEST]: state => ({
    ...state,
    isLoadingQuestion: true,
  }),
  [actions.GET_QUESTION_SUCCESS]: (state, action) => ({
    ...state,
    addQuestion: action.payload,
    isLoadingQuestion: false,
  }),
  [actions.GET_QUESTION_FAILURE]: state => ({
    ...state,
    isLoadingQuestion: false,
  }),
});

export default mainReducer;
