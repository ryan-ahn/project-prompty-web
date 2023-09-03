import { TPromptList } from '@libs/models/types';

export type TMessageRole = {
  role: string;
  content: string;
};

export type TSetStaticData = {
  promptList: TPromptList;
  relation: string;
};

export type TPostGptRecommendReq = {
  input: string;
};

export type TPostGptRecommendRes = string;

export type TPostGptChainReq = {
  character: string;
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

export type TPostGptSummaryReq = {
  assistant: Array<{ prompt: string; answer: string }>;
};

export type TPostGptSummaryRes = string;

export type TPostGptRelationRes = string;

export type TPostPromptReq = { promptList: TPromptList };

export type TPostPromptRes = { _id: string; title: string };

export type TGetPromptReq = { id: string };

export type TGetPromptRes = { promptList: TPromptList };
