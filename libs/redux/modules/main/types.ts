import { TPromptList } from '@libs/models/types';

export type TMessageRole = {
  role: string;
  content: string;
};

export type TSetStaticData = {
  promptList: TPromptList;
  addQuestion: string;
};

export type TGetDataReq = {
  assistant: Array<{ prompt: string; answer: string }>;
  input: string;
};

export type TGetDataRes = {
  prompt: string;
  answer: string;
};

export type TGetQuestionReq = {
  assistant: Array<{ prompt: string; answer: string }>;
  input: string;
};

export type TGetQuestionRes = string;
