import { Button } from '@chakra-ui/react'

interface Props {
  title: string
  submitting: boolean
  disabled: boolean
  onClickHandler?: () => void
}

function InputSubmitButton(props: Props) {
  return (
    <Button
      isLoading={props.submitting}
      loadingText="Sending.."
      colorScheme="green"
      variant="solid"
      isDisabled={props.disabled}
      type="submit"
      onClick={props.onClickHandler}
    >
      {props.title}
    </Button>
  )
}

export default InputSubmitButton
