import { TPromptList } from '@libs/models/types';

export type TMessageRole = {
  role: string;
  content: string;
};

export type TSetStaticData = {
  promptList: TPromptList;
  addQuestion: string;
};

export type TPostGptChainReq = {
  assistant: Array<{ prompt: string; answer: string }>;
  input: string;
};

export type TPostGptChainRes = {
  prompt: string;
  answer: string;
};

export type TPostGptRelationReq = {
  assistant: Array<{ prompt: string; answer: string }>;
  input: string;
};

export type TPostGptRelationRes = string;

export type TPostPromptReq = { promptList: TPromptList };

export type TPostPromptRes = { _id: string };

export type TGetPromptReq = { id: string };

export type TGetPromptRes = { promptList: TPromptList };
