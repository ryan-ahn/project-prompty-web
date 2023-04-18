/**
 * Author : Ryan
 * Date : 2022-07-01
 * Desc : use toast hooks
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { OPEN_TOAST, CLOSE_TOAST } from '@libs/redux/modules/toast/actions';

const useToast = () => {
  const dispatch = useDispatch();
  const openToast = useCallback((text: string) => {
    dispatch({
      type: OPEN_TOAST,
      payload: text,
    });
    //2초후에 닫기.
    setTimeout(closeToast, 1500);
  }, []);

  const closeToast = useCallback(() => {
    dispatch({
      type: CLOSE_TOAST,
    });
  }, []);

  return { openToast, closeToast };
};

export default useToast;
