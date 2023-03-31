/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : reducers
 */

import { TPrompt } from '@libs/models/graphql';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { TModalMode } from './types';

export type Actions = ActionType<typeof actions>;

export type TModalReducer = {
  modalMode: TModalMode;
  isOpenModal: boolean;
  prompt: TPrompt | null;
  gpt: string | null;
  response: null | string;
  isLoading: boolean;
};

export const initialState: TModalReducer = {
  modalMode: 'UNSET',
  isOpenModal: false,
  prompt: null,
  gpt: null,
  response: null,
  isLoading: false,
};

const mainReducer = createReducer<TModalReducer, Actions>(initialState, {
  [actions.CLOSE_MODAL]: state => ({
    ...state,
    modalMode: 'UNSET',
    isOpenModal: false,
    prompt: null,
    gpt: null,
    response: null,
  }),
  [actions.OPEN_MODAL]: (state, action) => ({
    ...state,
    modalMode: action.payload,
    isOpenModal: true,
  }),
  [actions.OPEN_PROMPT_MODAL]: (state, action) => ({
    ...state,
    modalMode: 'PROMPT',
    prompt: action.payload,
    isOpenModal: true,
  }),
  [actions.OPEN_CHAT_GPT_MODAL]: (state, action) => ({
    ...state,
    modalMode: 'GPT',
    gpt: action.payload,
    isOpenModal: true,
  }),
  [actions.GET_TEST_REQUEST]: state => ({
    ...state,
    isLoading: true,
  }),
  [actions.GET_TEST_SUCCESS]: (state, action) => ({
    ...state,
    response: action.payload,
    isLoading: false,
  }),
  [actions.GET_TEST_FAILURE]: state => ({
    ...state,
    isLoading: false,
  }),
});

export default mainReducer;
