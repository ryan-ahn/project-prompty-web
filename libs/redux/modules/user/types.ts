import { TUserDetail } from '@libs/models/types';

export type TKakaoCallbackReq = {
  code: string;
};

export type TKakaoCallbackRes = {
  userDetail: TUserDetail;
  token: {
    accessToken: string;
  };
};

export type TTokenAccessReq = {
  token: string;
};

export type TTokenAccessRes = {
  userDetail: TUserDetail;
};
