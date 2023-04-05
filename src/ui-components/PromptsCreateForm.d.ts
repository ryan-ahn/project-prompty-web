/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PromptsCreateFormInputValues = {
    category?: number;
};
export declare type PromptsCreateFormValidationValues = {
    category?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PromptsCreateFormOverridesProps = {
    PromptsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PromptsCreateFormProps = React.PropsWithChildren<{
    overrides?: PromptsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PromptsCreateFormInputValues) => PromptsCreateFormInputValues;
    onSuccess?: (fields: PromptsCreateFormInputValues) => void;
    onError?: (fields: PromptsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PromptsCreateFormInputValues) => PromptsCreateFormInputValues;
    onValidate?: PromptsCreateFormValidationValues;
} & React.CSSProperties>;
export default function PromptsCreateForm(props: PromptsCreateFormProps): React.ReactElement;
