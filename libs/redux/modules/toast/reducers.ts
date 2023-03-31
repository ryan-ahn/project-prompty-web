import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ToastAction = ActionType<typeof actions>;

export type TToastReducer = {
  toastText: string;
  isOpenToast: boolean;
};

export const initialState: TToastReducer = {
  toastText: '',
  isOpenToast: false,
};

const toastReducer = createReducer<TToastReducer, ToastAction>(initialState, {
  [actions.INIT_TOAST]: () => initialState,
  [actions.OPEN_TOAST]: (state, action) => ({
    ...state,
    toastText: action.payload,
    isOpenToast: true,
  }),
  [actions.CLOSE_TOAST]: state => ({
    ...state,
    toastText: '',
    isOpenToast: false,
  }),
});

export default toastReducer;
