import { Alert, AlertIcon, Box, Stack } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectUpdateLoginPasswordState, updateLoginPasswordAsync } from '../../redux/loginSlice'
import InputField, { InputFieldType } from './InputField'
import InputSubmitButton from './InputSubmitButton'

interface Props {
  resetPasswordToken: string
}

const UpdateLoginPasswordForm = (props: Props) => {
  const [password, setPassword] = React.useState('')
  const [passwordValidated, setPasswordValidated] = React.useState(false)
  const [errorMode, setErrorMode] = useState(false)
  const [tempLockout, setTempLockout] = useState(false)

  var dispatch = useAppDispatch()
  var updateLoginPasswordState = useAppSelector(selectUpdateLoginPasswordState)

  useEffect(() => {
    if (tempLockout === false) return
    let timeout = setTimeout(() => setTempLockout(false), 3000)
    return () => clearTimeout(timeout)
  }, [tempLockout])

  const isValid = passwordValidated
  const isEligible =
    !tempLockout && updateLoginPasswordState.status !== 'loading'

  let handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) {
      setErrorMode(true)
      return
    }

    setErrorMode(false)
    setTempLockout(true)
    dispatch(
      updateLoginPasswordAsync({
        password,
        resetPasswordToken: props.resetPasswordToken,
      })
    )
  }

  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={3}>
          <InputField
            label="Password"
            name="password"
            type={InputFieldType.password}
            onChangeHandler={setPassword}
            onIsValidChangeHandler={setPasswordValidated}
            value={password}
            placeholder="testpassword"
            displayErrorIfInvalid={errorMode}
            minLength={2}
          />

          <InputSubmitButton
            disabled={!isEligible}
            submitting={updateLoginPasswordState.status === 'loading'}
            title="Update Password"
          />

          {updateLoginPasswordState.status === 'failed' && (
            <Alert status="error">
              <AlertIcon />
              {updateLoginPasswordState.errorMessage}
            </Alert>
          )}

          {updateLoginPasswordState.successMessage && (
            <Alert status="success">
              <AlertIcon />
              {updateLoginPasswordState.successMessage}
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  )
}

export default UpdateLoginPasswordForm
