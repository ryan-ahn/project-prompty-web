// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Prompts, Prompt } = initSchema(schema);

export {
  Prompts,
  Prompt
};