import {
  Control,
  FieldPath,
  FieldError,
  ControllerProps,
  FieldValues,
} from "react-hook-form";
import { TypographyProps } from "@mui/material/Typography";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

export type InputType = "text" | "email" | "password" | "date";

export type TextInputProps = Partial<Omit<OutlinedInputProps, "error">> & {
  title?: string;
  error?: FieldError;
  labelSx?: TypographyProps["sx"];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ControlledInputType<FormValues extends FieldValues> = {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  rules?: ControllerProps["rules"];
  type?: InputType;
};

export type ControlledInputProps<FormValues extends FieldValues> =
  ControlledInputType<FormValues> &
    Omit<TextInputProps, "error"> & {
      parser?: (val: string) => string;
    };
