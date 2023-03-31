export type TPrompts = Array<TPrompt>;

export type TPrompt = {
  id: number;
  author: string;
  position: string;
  title: string;
  prompt: string;
  category: number;
};
