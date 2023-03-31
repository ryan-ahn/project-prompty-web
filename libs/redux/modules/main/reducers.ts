import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TMainReducer = {
  response: null | string;
  isLoading: boolean;
};

export const initialState: TMainReducer = {
  response: null,
  isLoading: false,
};

const mainReducer = createReducer<TMainReducer, Actions>(initialState, {
  [actions.CLOSE_GPT]: state => ({
    ...state,
    response: null,
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
