import { Container, Heading, Stack, Text } from '@chakra-ui/react'
import ForgotLoginPasswordForm from '../components/form/ForgotLoginPasswordForm'

const ForgotLoginPassword = () => {
  return (
    <Container paddingTop="150px" maxW={'60ch'}>
      <Stack spacing={10}>
        <Stack spacing={4}>
          <Heading as="h1" size="xl">
            Forgot password
          </Heading>
          <Text color="gray.500">
            Submit the email address associated with your account and we will send you a link to reset your password. <br/>
            Make sure to check your spam folder if you don't see the email in your inbox.
          </Text>
        </Stack>
        <ForgotLoginPasswordForm></ForgotLoginPasswordForm>
      </Stack>
    </Container>
  )
}

export default ForgotLoginPassword
