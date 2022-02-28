import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Stack,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  submitButton?: React.ReactNode
  children?: React.ReactNode
}

export default function CustomModal(props: Props) {
  return (
    <>
      <Modal onClose={props.onClose} size="xl" isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={'8'}>
              <Text color="gray.500" whiteSpace={'pre-line'}>
                {props.content}
              </Text>
              <Box>{props.children}</Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>Cancel</Button>
            {props.submitButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
