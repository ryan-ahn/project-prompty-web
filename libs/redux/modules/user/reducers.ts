import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type Actions = ActionType<typeof actions>;

export type TUserReducer = {
  isLoggedIn: boolean;
};

export const initialState: TUserReducer = {
  isLoggedIn: false,
};

const userReducer = createReducer<TUserReducer, Actions>(initialState, {
  [actions.CHECK_ACCESS]: state => ({
    ...state,
    isLoggedIn: true,
  }),
  [actions.POST_SIGN_IN_REQUEST]: state => ({
    ...state,
    isLoggedIn: false,
  }),
  [actions.POST_SIGN_IN_SUCCESS]: state => ({
    ...state,
    isLoggedIn: true,
  }),
  [actions.POST_SIGN_IN_FAILURE]: state => ({
    ...state,
    isLoggedIn: false,
  }),
});

export default userReducer;
