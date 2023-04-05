import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerPrompt = {
  readonly prompt: string;
  readonly answer: string;
}

type LazyPrompt = {
  readonly prompt: string;
  readonly answer: string;
}

export declare type Prompt = LazyLoading extends LazyLoadingDisabled ? EagerPrompt : LazyPrompt

export declare const Prompt: (new (init: ModelInit<Prompt>) => Prompt)

type EagerPrompts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Prompts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly data: (Prompt | null)[];
  readonly category: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrompts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Prompts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly data: (Prompt | null)[];
  readonly category: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Prompts = LazyLoading extends LazyLoadingDisabled ? EagerPrompts : LazyPrompts

export declare const Prompts: (new (init: ModelInit<Prompts>) => Prompts) & {
  copyOf(source: Prompts, mutator: (draft: MutableModel<Prompts>) => MutableModel<Prompts> | void): Prompts;
}