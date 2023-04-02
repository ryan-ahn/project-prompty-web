/**
 * Author : Ryan
 * Date : 2023-03-25
 * Desc : index
 */

import { CombinedState, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { all, fork } from 'redux-saga/effects';
import { TUserReducer } from './user/reducers';
import { TMainReducer } from './main/reducers';
import { TToastReducer } from './toast/reducers';
import user from './user';
import main from './main';
import modal from './modal';
import toast from './toast';
import { TModalReducer } from './modal/reducers';

interface IState {
  user: TUserReducer;
  main: TMainReducer;
  modal: TModalReducer;
  toast: TToastReducer;
}

const rootReducer = (state: IState | undefined, action: any): CombinedState<IState> => {
  switch (action.type) {
    // case HYDRATE:
    //   return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        user: user.reducer,
        main: main.reducer,
        modal: modal.reducer,
        toast: toast.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

function* rootSaga() {
  yield all([fork(main.saga), fork(user.saga)]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default {
  rootReducer: rootReducer,
  rootSaga: rootSaga,
};
