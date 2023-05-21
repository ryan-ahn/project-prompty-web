/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : actions
 */

import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';
import * as types from './types';

export const OPEN_MODAL = 'OPEN_MODAL';
export const openModal = createAction(OPEN_MODAL)<types.TModalMode>();

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = createAction(CLOSE_MODAL)();
