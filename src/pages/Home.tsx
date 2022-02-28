import { Container, Heading, Stack, Text } from '@chakra-ui/react'
import { useRequireAuth } from '../hooks/hooks'

const Home = () => {
  useRequireAuth()

  return (
    <Container paddingTop="150px" maxW={'90ch'}>
      <Stack spacing={10}>
        <Heading as="h1" size="xl">
          Boilerplate React App
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        </Text>
      </Stack>
    </Container>
  )
}

export default Home
