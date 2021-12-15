import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, NumberInputProps } from "@chakra-ui/number-input";
import { useFormContext, get, RegisterOptions, Controller } from "react-hook-form";

interface InputRhfProps extends NumberInputProps {
  name: string
  label?: string
  defaultValue?: number
  options?: RegisterOptions
}

export function NumberInputRhf({ name, options, label, defaultValue, ...numberInputProps }: InputRhfProps) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={options}
      render={({
        field: { onChange, ...field },
      }) => (
        <FormControl isInvalid={get(errors, name)}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <NumberInput
            {...numberInputProps}
            defaultValue={defaultValue}
            onChange={(_, valueAsNumber) => onChange(valueAsNumber)}
            {...field}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <FormErrorMessage>
            {get(errors, name)?.message}
          </FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
