import { Box, Center, Heading, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function FourOhFour() {
  const router = useNavigate()

  return (
    <Center flexDir='column' h='100vh'>
      <Box>
        <Heading as='h1' size='2xl' mb={4}>
          Oops! Something went wrong.
        </Heading>
        <Text mb={6}>We couldn't find the page you were looking for.</Text>
        <Button colorScheme='blue' onClick={() => router('/')}>
          Go Back Home
        </Button>
      </Box>
    </Center>
  )
}
