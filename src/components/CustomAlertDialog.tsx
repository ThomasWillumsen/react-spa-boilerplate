import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react'
import React from 'react'

interface Props{
  isOpen: boolean,
  onClose: () => void,
  onSubmit: () => void,
  title: string,
  content: string,
}

export default function CustomAlertDialog(props: Props) {
  const cancelRef = React.useRef(null)

  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
        isOpen={props.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{props.title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{props.content}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' ml={3} onClick={props.onSubmit}>
              Proceed
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}