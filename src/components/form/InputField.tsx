import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export enum InputFieldType {
  text,
  email,
  password,
}

interface Props {
  label: string
  name: string
  type: InputFieldType
  value: string
  isRequired?: boolean
  placeholder?: string
  minLength?: number
  maxLength?: number
  pattern?: string
  displayErrorIfInvalid?: boolean
  errorText?: string
  onChangeHandler: (value: string) => void
  onIsValidChangeHandler?: (isValid: boolean) => void
}

const InputField = (props: Props) => {
  const [input, setInput] = useState(props.value || '')

  const isValid =
    input.length >= (props.minLength ?? 0) &&
    input.length <= (props.maxLength ?? 9999999) &&
    (!props.pattern || RegExp(props.pattern!).test(input))

  useEffect(() => {
    props.onChangeHandler(input)
    props.onIsValidChangeHandler && props.onIsValidChangeHandler(isValid)
  }, [input])

  return (
    <>
      <FormControl
        isInvalid={props.displayErrorIfInvalid && !isValid}
        isRequired={props.isRequired}
      >
        <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
        <Input
          id={props.name}
          type={InputFieldType[props.type]}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event) => setInput(event.target.value)}
        />
        {props.displayErrorIfInvalid && !isValid && (
          <FormErrorMessage>
            {props.errorText ?? 'Field is invalid'}
          </FormErrorMessage>
        )}
      </FormControl>
    </>
  )
}

export default InputField
