export type TPromptList = Array<TPrompt>;

export type TPrompt = {
  prompt: string;
  answer: string;
};

export type TUserDetail = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  profileImage: string;
  company: string;
  introduce: string;
  createAt: string;
  updateAt: string;
  deleteAt: string;
};
