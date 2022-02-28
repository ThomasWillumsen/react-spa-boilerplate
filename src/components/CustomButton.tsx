import { Button } from '@chakra-ui/react'

interface Props {
  title: string
  submitting?: boolean
  disabled?: boolean
  onClickHandler?: () => void
  color?: 'green' | 'red'
}

function CustomButton(props: Props) {
  return (
    <Button
      isLoading={props.submitting === true}
      colorScheme={props.color || 'green'}
      variant="solid"
      isDisabled={props.disabled === true}
      onClick={props.onClickHandler}
      type="button"
    >
      {props.title}
    </Button>
  )
}

export default CustomButton
