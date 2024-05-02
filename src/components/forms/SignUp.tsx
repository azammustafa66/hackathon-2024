'use client'
import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useToast,
  Link
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useSignUpStore } from '../../utils/zustand/store'
import { signupSchema } from '../../utils/constants/schema.constants'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signupSchema)
  })
  const { handleSignUp, isLoading } = useSignUpStore()
  const router = useNavigate()
  const toast = useToast()

  const onSubmit = async (formData: any) => {
    const result = await handleSignUp(formData)
    if (result) {
      toast({
        title: 'Sign up failed',
        description: result,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Sign up successful. Please login.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      router('/login')
    }
  }

  return (
    <VStack spacing={8} pb={8} maxW='400px' mx={'auto'}>
      <Center>
        <Text fontSize='3xl' fontWeight='bold'>
          Register
        </Text>
      </Center>

      <Text>
        Please ensure that your institution is registered before signing up. If not, please register
        your institution. To register{' '}
        <Link href={'/register-institute'} color={'blue.500'}>
          click here
        </Link>
      </Text>

      <VStack as='form' onSubmit={handleSubmit(onSubmit)} spacing={4} w='100%' noValidate>
        <FormControl isRequired>
          <FormLabel htmlFor='firstName'>First Name</FormLabel>
          <Input id='firstName' type='text' {...register('firstName')} />
          <FormHelperText color='red.500' textAlign='left'>
            {errors.firstName?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
          <Input id='lastName' type='text' {...register('lastName')} />
          <FormHelperText color='red.500' textAlign='left'>
            {errors.lastName?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='email' type='email' {...register('email')} />
          <FormHelperText color='red.500' textAlign='left'>
            {errors.email?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input id='password' type='password' {...register('password')} />
          <FormHelperText color='red.500' textAlign='left'>
            {errors.password?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>User Type</FormLabel>
          <RadioGroup defaultValue='student' name='userType'>
            <HStack spacing={2} align='stretch'>
              <Radio value='student' {...register('userType')}>
                Student
              </Radio>
              <Radio value='proctor' {...register('userType')}>
                Proctor
              </Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText color='red.500' textAlign='left'>
            {errors.userType?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='institutionName'>Institution Name (Enter complete name in caps)</FormLabel>
          <Input id='institutionName' type='text' {...register('institutionName')} />
          <FormHelperText color='red.500' textAlign='left'>
            {errors.institutionName?.message}
          </FormHelperText>
        </FormControl>

        <Button type='submit' colorScheme='teal' w='100%' isLoading={isLoading}>
          Sign Up
        </Button>
      </VStack>
    </VStack>
  )
}
