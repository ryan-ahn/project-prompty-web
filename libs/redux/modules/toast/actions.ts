import { createAction } from 'typesafe-actions';

export const INIT_TOAST = 'INIT_TOAST';
export const initToast = createAction(INIT_TOAST)();

export const OPEN_TOAST = 'OPEN_TOAST';
export const openToast = createAction(OPEN_TOAST)<string>();

export const CLOSE_TOAST = 'CLOSE_TOAST';
export const closeToast = createAction(CLOSE_TOAST)();
