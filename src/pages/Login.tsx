import {
  Box,
  Container,
  Divider,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { Navigate, Link as ReactRouterLink } from 'react-router-dom'
import { appRoutes } from '../appRoutes'
import LoginForm from '../components/form/LoginForm'
import { useAppSelector } from '../hooks/hooks'
import { selectIsLoggedIn } from '../redux/loginSlice'

const Login = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  if (isLoggedIn) return <Navigate to={appRoutes.home} />

  return (
    <Container paddingTop="150px" maxW={'60ch'}>
      <Stack spacing={10}>
        <Stack spacing={4}>
          <Heading as="h1" size="lg">
            Boilerplate react app
          </Heading>
          <Divider/>
          <Heading as="h2" size="md">
            Login
          </Heading>
          <Text color="gray.500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
        </Stack>
        <LoginForm></LoginForm>
      </Stack>
      <Text fontSize="small">
        Forgot password? Click{' '}
        <Link
          as={ReactRouterLink}
          color="teal.500"
          to={appRoutes.forgotLoginPassword}
        >
          here
        </Link>{' '}
        to create a new
      </Text>
    </Container>
  )
}

export default Login
