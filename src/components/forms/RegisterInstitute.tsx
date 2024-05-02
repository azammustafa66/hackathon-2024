import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useRegisterInstituteStore } from '../../utils/zustand/store'
import { institutionSchema } from '../../utils/constants/schema.constants'

export default function RegisterInstitute() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(institutionSchema)
  })
  const { handleRegisterInstitute, isLoading } = useRegisterInstituteStore()
  const toast = useToast()
  const router = useNavigate()

  const handleRegistration = async (formData: any) => {
    const error = await handleRegisterInstitute(formData)
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Success',
        description: 'Institution registered successfully. Please login.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      router('/login')
    }
  }

  return (
    <VStack spacing={8} p={4} maxW={'400px'} mx={'auto'}>
      <Center>
        <Text fontSize={'3xl'} fontWeight={'bold'}>
          Register Institution
        </Text>
      </Center>

      <VStack
        as={'form'}
        onSubmit={handleSubmit(handleRegistration)}
        spacing={4}
        w={'100%'}
        noValidate
      >
        <FormControl isRequired>
          <FormLabel htmlFor='institutionName'>Institution Name</FormLabel>
          <Input id='institutionName' type={'text'} {...register('institutionName')} />
          <FormHelperText color={'red.500'} textAlign={'left'}>
            {errors.institutionName?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='institutionEmail'>Email</FormLabel>
          <Input id='institutionEmail' type={'email'} {...register('institutionEmail')} />
          <FormHelperText color={'red.500'} textAlign={'left'}>
            {errors.institutionEmail?.message}
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='institutionPassword'>Password</FormLabel>
          <Input id='institutionPassword' type={'password'} {...register('institutionPassword')} />
          <FormHelperText color={'red.500'} textAlign={'left'}>
            {errors.institutionPassword?.message}
          </FormHelperText>
        </FormControl>

        <Button type={'submit'} colorScheme={'teal'} w={'100%'} isLoading={isLoading}>
          Register
        </Button>
      </VStack>
    </VStack>
  )
}
