interface SignUpFormData {
  email: string
  password: string
  firstName: string
  lastName: string
  userType: string
  institutionName: string
}

interface SignUpFormState {
  handleSignUp: (formData: SignUpFormData) => Promise<string | void>
  isLoading: boolean
}

interface RegisterInstituteFormData {
  institutionName: string
  institutionEmail: string
  institutionPassword: string
}

interface RegisterInstituteState {
  handleRegisterInstitute: (formData: RegisterInstituteFormData) => Promise<string | void>
  isLoading: boolean
}

interface LoginFormData {
  email: string
  password: string
  userType: 'student' | 'proctor' | 'institute'
}

interface LoginState {
  handleLogin: (formData: LoginFormData) => Promise<string | void>
  isLoading: boolean
  user: string | null
  userType: 'student' | 'proctor' | 'institute'
}

export type { SignUpFormState, RegisterInstituteState, LoginState }
