import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      'Must contain one uppercase, one number, and one symbol'
    ),
  userType: yup
    .string()
    .required('Please select a user type')
    .test('is-selected', 'Please select a user type', (value) => {
      return value !== ''
    }),
  institutionName: yup
    .string()
    .required('Institution name is required')
    .min(2, 'Institution name must be at least 2 characters')
})

export const institutionSchema = yup.object().shape({
  institutionName: yup
    .string()
    .required('Institution name is required')
    .min(2, 'Institution name must be at least 2 characters'),
  institutionEmail: yup.string().email('Invalid email').required('Email is required'),
  institutionPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
      'Must contain one uppercase, one number, and one symbol'
    )
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

export const resetSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
})
