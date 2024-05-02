import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useLoginStore } from '../../utils/zustand/store'
import { loginSchema } from '../../utils/constants/schema.constants'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })
  const { handleLogin, userType, isLoading } = useLoginStore()
  const toast = useToast()
  const router = useNavigate()

  const onSubmit = async (formData: any) => {
    try {
      const result = await handleLogin(formData)
      if (result) {
        toast({
          title: 'Login failed',
          description: result,
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      } else {
        toast({
          title: 'Login successful.',
          description: 'Welcome back!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        if (userType === 'student' || userType === 'proctor') {
          router('/exams')
        } else {
          router('/conduct-exam')
        }
      }
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  return (
    <VStack spacing={8} p={4} maxW='400px' mx='auto'>
      <Center>
        <Text fontSize='3xl' fontWeight='bold'>
          Login
        </Text>
      </Center>

      <VStack as='form' onSubmit={handleSubmit(onSubmit)} spacing={4} w='100%' noValidate>
        <FormControl isRequired>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='email' type='email' {...register('email')} />
          <FormHelperText color='red.500'>{errors.email?.message}</FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input id='password' type='password' {...register('password')} />
          <FormHelperText color='red.500'>{errors.password?.message}</FormHelperText>
        </FormControl>

        <Button type='submit' colorScheme='teal' w='100%' isLoading={isLoading}>
          Login
        </Button>
        <Link href='/reset-password'>Forgot Password</Link>
      </VStack>
    </VStack>
  )
}
