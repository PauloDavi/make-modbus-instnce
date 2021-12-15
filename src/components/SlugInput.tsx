import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import { useFormContext, get, RegisterOptions, Controller } from "react-hook-form";
import slugify from "slugify";

interface InputRhfProps extends InputProps {
  name: string
  label?: string
  options?: RegisterOptions
}

export function SlugInputRhf({ name, options, label, ...inputProps }: InputRhfProps) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={options}
      render={({
        field: { onChange,onBlur, ...field },
      }) => (
        <FormControl isInvalid={get(errors, name)}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <Input
          {...inputProps}
          onChange={onChange}
          onBlur={(e) => {
            onBlur()
            onChange(slugify(e.target.value, {
              replacement: "_",
              lower: true,
              strict: true,
            }))
          }}
          {...field}
          />

          <FormErrorMessage>
            {get(errors, name)?.message}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
