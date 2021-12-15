import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import { useFormContext, get, RegisterOptions } from "react-hook-form";

interface InputRhfProps extends InputProps {
  name: string
  label?: string
  options?: RegisterOptions
}

export function InputRhf({ name, options, label, ...inputProps }: InputRhfProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormControl isInvalid={get(errors, name)}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <Input
        {...inputProps}
        {...register(name, {
          ...options,
          setValueAs: v => v.trim()
        })}
      />

      <FormErrorMessage>
        {get(errors, name)?.message}
      </FormErrorMessage>
    </FormControl>
  )
}
