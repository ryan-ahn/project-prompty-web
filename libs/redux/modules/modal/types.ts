/**
 * Author : Ryan
 * Date : 2023-03-28
 * Desc : types
 */

import { TPrompt } from '@libs/models/graphql';

export type TModalMode = 'UNSET' | 'NOTHING' | 'PROMPT' | 'GPT' | 'CREATE_PROMPT';

export type TPromptModal = TPrompt;

export type TTestReq = string;

export type TTestRes = string;
