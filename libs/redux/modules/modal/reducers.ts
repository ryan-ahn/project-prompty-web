/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : reducers
 */

import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { TModalMode } from './types';

export type Actions = ActionType<typeof actions>;

export type TModalReducer = {
  modalMode: TModalMode;
  isOpenModal: boolean;
  gpt: string | null;
  response: null | string;
  isLoading: boolean;
};

export const initialState: TModalReducer = {
  modalMode: 'UNSET',
  isOpenModal: false,
  gpt: null,
  response: null,
  isLoading: false,
};

const mainReducer = createReducer<TModalReducer, Actions>(initialState, {
  [actions.OPEN_MODAL]: (state, action) => ({
    ...state,
    modalMode: action.payload,
    isOpenModal: true,
  }),

  [actions.CLOSE_MODAL]: state => ({
    ...state,
    modalMode: 'UNSET',
    isOpenModal: false,
    prompt: null,
    gpt: null,
    response: null,
  }),
});

export default mainReducer;
