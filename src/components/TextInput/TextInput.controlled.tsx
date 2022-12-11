import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { FieldsErrors } from "../../constants";
import { TextInput } from "./TextInput.component";
import {
  InputType,
  ControlledInputProps
} from "./TextInput.types";

const inputValidation: Record<InputType, UseControllerProps["rules"]> = {
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: FieldsErrors.InvalidEmail,
    },
  },
  text: {},
  password: {
    minLength: {
      value: 8,
      message: FieldsErrors.PasswordTooShort,
    },
  },
  date: {},
};

export const ControlledInput = <FormValues extends FieldValues>({
  name,
  type = "text",
  rules,
  control,
  parser,
  ...inputProps
}: ControlledInputProps<FormValues>) => (
  <Controller
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextInput
        {...inputProps}
        onChange={onChange}
        error={error}
        value={parser ? parser(value) : value}
        type={type}
      />
    )}
    name={name}
    control={control}
    rules={{
      required: FieldsErrors.required,
      ...inputValidation[type],
      ...rules,
    }}
  />
);
