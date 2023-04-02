import { TPromptList } from '@libs/models/types';

export type TSetStaticData = {
  promptList: TPromptList;
  addQuestion: string;
};

export type TGetDataReq = {
  input: string;
};

export type TGetDataRes = {
  prompt: string;
  answer: string;
};

export type TGetQuestionReq = {
  input: string;
};

export type TGetQuestionRes = string;
