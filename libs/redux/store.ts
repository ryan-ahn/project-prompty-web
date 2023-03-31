/**
 * Author : Ryan
 * Date : 2023-03-25
 * Desc : store
 */

import { legacy_createStore as createStore, applyMiddleware, Store, compose } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { Task } from 'redux-saga';
import modules from '@libs/redux/modules';

export interface SagaStore extends Store {
  sagaTask?: Task;
}
//middle ware
const bindMiddleWare = (middleware: any) => {
  if (process.env.NEXT_PUBLIC_HOST !== 'https://www.prompty.im/') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return compose(applyMiddleware(...middleware));
};

//redux store
export const configStore: MakeStore<SagaStore> = (context: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const store: SagaStore = createStore(modules.rootReducer, bindMiddleWare([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(modules.rootSaga);
  return store;
};

export const wrapper = createWrapper(configStore, { debug: false });
