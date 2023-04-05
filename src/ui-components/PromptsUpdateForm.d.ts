/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Prompts } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PromptsUpdateFormInputValues = {
    category?: number;
};
export declare type PromptsUpdateFormValidationValues = {
    category?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PromptsUpdateFormOverridesProps = {
    PromptsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PromptsUpdateFormProps = React.PropsWithChildren<{
    overrides?: PromptsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    prompts?: Prompts;
    onSubmit?: (fields: PromptsUpdateFormInputValues) => PromptsUpdateFormInputValues;
    onSuccess?: (fields: PromptsUpdateFormInputValues) => void;
    onError?: (fields: PromptsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PromptsUpdateFormInputValues) => PromptsUpdateFormInputValues;
    onValidate?: PromptsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PromptsUpdateForm(props: PromptsUpdateFormProps): React.ReactElement;
