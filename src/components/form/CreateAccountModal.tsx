import { Alert, AlertIcon, Box, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {
  CreateAccountAsync,
  selectCreateAccountState,
} from '../../redux/accountsSlice'
import CustomModal from '../CustomModal'
import InputField, { InputFieldType } from './InputField'
import InputSubmitButton from './InputSubmitButton'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}
const CreateAccountModal = (props: Props) => {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [fullNameValidated, setFullNameValidated] = React.useState(false)
  const [emailValidated, setEmailValidated] = React.useState(false)
  const [errorMode, setErrorMode] = useState(false)

  const state = useAppSelector(selectCreateAccountState)
  const dispatch = useAppDispatch()
  const isValid = fullNameValidated && emailValidated

  const handleFormSubmit = () => {
    if (!isValid) {
      setErrorMode(true)
      return
    }

    setErrorMode(false)
    dispatch(CreateAccountAsync({ email, fullName, isAdmin: false })).then(() =>
      props.onClose()
    )
  }

  const SubmitButton = (
    <InputSubmitButton
      disabled={errorMode && !isValid}
      submitting={state.status === 'loading'}
      title="Udfør"
      onClickHandler={handleFormSubmit}
    />
  )

  return (
    <CustomModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={props.title}
      content={props.content}
      submitButton={SubmitButton}
    >
      <Box>
        <form>
          <Stack spacing={3}>
            <InputField
              label="Fullname"
              name="accountFullName"
              type={InputFieldType.text}
              onChangeHandler={setFullName}
              onIsValidChangeHandler={setFullNameValidated}
              value={fullName}
              placeholder="Donald Trump"
              displayErrorIfInvalid={errorMode}
              minLength={2} // TODO use openapi generated object
            />

            <InputField
              label="Email"
              name="accountEmail"
              type={InputFieldType.email}
              onChangeHandler={setEmail}
              onIsValidChangeHandler={setEmailValidated}
              value={email}
              placeholder="donald@trump.com"
              displayErrorIfInvalid={errorMode}
            />

            {state.status === 'failed' && (
              <Alert status="error">
                <AlertIcon />
                {state.errorMessage}
              </Alert>
            )}
          </Stack>
        </form>
      </Box>
    </CustomModal>
  )
}

export default CreateAccountModal
