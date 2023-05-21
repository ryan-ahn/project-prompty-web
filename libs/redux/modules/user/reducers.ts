import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { TUserDetail } from '@libs/models/types';

export type Actions = ActionType<typeof actions>;

export type TUserReducer = {
  isLoggedIn: boolean;
  userDetail: TUserDetail | null;
};

export const initialState: TUserReducer = {
  isLoggedIn: false,
  userDetail: null,
};

const userReducer = createReducer<TUserReducer, Actions>(initialState, {
  [actions.SIGN_OUT]: state => ({
    ...state,
    isLoggedIn: false,
    userDetail: null,
  }),

  [actions.GET_KAKAO_CALLBACK_REQUEST]: state => ({
    ...state,
    isLoggedIn: false,
  }),
  [actions.GET_KAKAO_CALLBACK_SUCCESS]: (state, action) => ({
    ...state,
    isLoggedIn: true,
    userDetail: action.payload.userDetail,
  }),
  [actions.GET_KAKAO_CALLBACK_FAILURE]: state => ({
    ...state,
    isLoggedIn: false,
  }),

  [actions.GET_TOKEN_ACCESS_REQUEST]: state => ({
    ...state,
    isLoggedIn: false,
  }),
  [actions.GET_TOKEN_ACCESS_SUCCESS]: (state, action) => ({
    ...state,
    isLoggedIn: true,
    userDetail: action.payload.userDetail,
  }),
  [actions.GET_TOKEN_ACCESS_FAILURE]: state => ({
    ...state,
    isLoggedIn: false,
  }),
});

export default userReducer;
