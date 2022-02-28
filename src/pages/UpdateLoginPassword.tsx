import { Container, Heading, Link, Stack, Text } from '@chakra-ui/react'
import UpdateLoginPasswordForm from '../components/form/UpdateLoginPasswordForm'
import { httpHelper } from '../utils/httpHelper'
import { Link as ReactRouterLink } from 'react-router-dom'
import { appRoutes } from '../appRoutes'

const UpdateLoginPassword = () => {
  const pwToken = httpHelper.getQueryParam('passwordToken')

  return (
    <Container paddingTop="150px" maxW={'60ch'}>
      <Stack spacing={10}>
        <Stack spacing={4}>
          <Heading as="h1" size="xl">
            Update password
          </Heading>
          <Text color="gray.500">Write your new password</Text>
        </Stack>
        <UpdateLoginPasswordForm
          resetPasswordToken={pwToken}
        ></UpdateLoginPasswordForm>
      </Stack>
      <Text fontSize="small">
        Log in as administrator {' '}
        <Link as={ReactRouterLink} color="teal.500" to={appRoutes.login}>
          here
        </Link>
      </Text>
    </Container>
  )
}

export default UpdateLoginPassword
