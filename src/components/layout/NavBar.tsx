import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Flex, Text, Button, Link as ChakraLink } from '@chakra-ui/react'

import { useLoginStore, useLogOutStore } from '../../utils/zustand/store'

export default function NavBar() {
  const router = useNavigate()
  const { user } = useLoginStore()
  const { handleLogOut } = useLogOutStore()

  return (
    <Box as='nav' backgroundColor='teal.500' color='white' p={4}>
      <Flex justifyContent='space-between'>
        <ChakraLink as={RouterLink} href={'/'}>
          <Text fontSize='3xl' fontWeight='bold'>
            FairPlay
          </Text>
        </ChakraLink>

        <Flex gap={2}>
          {user === null ? (
            <>
              <ChakraLink href={'/login'}>
                <Button textColor={'white'} colorScheme='teal' variant='solid'>
                  Log In
                </Button>
              </ChakraLink>
              <ChakraLink href={'/signup'}>
                <Button textColor={'white'} colorScheme='teal' variant='solid'>
                  Sign Up
                </Button>
              </ChakraLink>
            </>
          ) : (
            <Button
              type='submit'
              colorScheme='teal'
              onClick={() => {
                handleLogOut()
                router('/login')
              }}
            >
              Log Out
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
