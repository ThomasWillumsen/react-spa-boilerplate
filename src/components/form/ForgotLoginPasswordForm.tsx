import { Alert, AlertIcon, Box, Stack } from '@chakra-ui/react'
import React, { FormEvent, useEffect, useState } from 'react'
import { createBoilerplateApiClient } from '../../api/ApiClientFactory'
import InputField, { InputFieldType } from './InputField'
import InputSubmitButton from './InputSubmitButton'

const ForgotLoginPasswordForm = () => {
  const [email, setEmail] = React.useState('')
  const [emailValidated, setEmailValidated] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorMode, setErrorMode] = useState(false)
  const [tempLockout, setTempLockout] = useState(false)

  useEffect(() => {
    if (tempLockout === false) return
    let timeout = setTimeout(() => setTempLockout(false), 3000)
    return () => clearTimeout(timeout)
  }, [tempLockout])

  const isValid = emailValidated
  const isEligible = !tempLockout && !isSubmitting

  let handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) {
      setErrorMode(true)
      return
    }

    setErrorMode(false)
    setErrorMessage("");
    setSuccessMessage("");
    setTempLockout(true)
    createBoilerplateApiClient()
      .accounts.resetAccountPassword({ email: email })
      .then(() => {
        setSuccessMessage(
          'A new password has been sent to your email address.'
        )
        setEmail('')
      })
      .catch((error) =>
        setErrorMessage(
          'Something went wrong. Please try again later.'
        )
      )
      .finally(() => {
        setTempLockout(true)
        setIsSubmitting(false)
      })
  }

  return (
    <Box>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={3}>
          <InputField
            label="Email"
            name="email"
            type={InputFieldType.email}
            onChangeHandler={setEmail}
            onIsValidChangeHandler={setEmailValidated}
            value={email}
            placeholder="donald@trump.com"
            displayErrorIfInvalid={errorMode}
            minLength={2} // TODO use object
          />

          <InputSubmitButton
            disabled={!isEligible}
            submitting={isSubmitting}
            title="Send link"
          />

          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert status="success">
              <AlertIcon />
              {successMessage}
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  )
}

export default ForgotLoginPasswordForm
