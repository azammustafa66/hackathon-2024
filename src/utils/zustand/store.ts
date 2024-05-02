import { create } from 'zustand'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

import { db, auth } from '../firebase/firebase'
import { SignUpFormState, RegisterInstituteState, LoginState } from '../constants/types.store'
import { devtools, persist } from 'zustand/middleware'

const useSignUpStore = create<SignUpFormState>()((set) => ({
  handleSignUp: async (formData) => {
    set({ isLoading: true })
    try {
      // 1. Create a new user with the email and password provided by the user.
      const { email, password, firstName, lastName, userType, institutionName } = formData
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      if (!user) {
        return 'User not created. Please try again.'
      }

      // 2. Update the user profile with the first name and last name provided by the user.
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      })

      // 3. Get the institution ID using the institution name provided by the user.
      const institutionSnapshot = await getDocs(
        query(collection(db, 'institutions'), where('name', '==', institutionName))
      )
      if (institutionSnapshot.empty) {
        return 'Institution not found. Please contact your institution administrator.'
      }
      const institutionId = institutionSnapshot.docs[0].id

      // 4. Add the user to the users collection in Firestore.
      await addDoc(collection(db, 'users'), {
        id: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        userType: userType,
        instituteId: institutionId
      })
      return
    } catch (error: any) {
      return error.message as string
    } finally {
      set({ isLoading: false })
    }
  },
  isLoading: false
}))

const useRegisterInstituteStore = create<RegisterInstituteState>()((set) => ({
  handleRegisterInstitute: async (formData) => {
    set({ isLoading: true })
    try {
      const { institutionName, institutionEmail, institutionPassword } = formData
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        institutionEmail,
        institutionPassword
      )
      const user = userCredential.user
      if (!user) {
        return 'Institution not created. Please try again.'
      }

      await updateProfile(user, {
        displayName: institutionName
      })

      await addDoc(collection(db, 'institutions'), {
        id: user.uid,
        name: institutionName,
        email: institutionEmail
      })
      return
    } catch (error: any) {
      return error.message as string
    } finally {
      set({ isLoading: false })
    }
  },
  isLoading: false
}))

const useLoginStore = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        userType: 'student',
        isLoading: false,
        handleLogin: async (formData) => {
          try {
            set({ isLoading: true })

            const { email, password } = formData
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)

            if (!userCredentials.user) {
              set({ isLoading: false })
              return 'User not found. Please register first.'
            }

            let userType: 'student' | 'proctor' | 'institute' = 'student'
            const userSnapshot = await getDocs(
              query(collection(db, 'users'), where('email', '==', userCredentials.user.email))
            )
            if (!userSnapshot.empty) {
              userType = userSnapshot.docs[0].data().role
            } else {
              userType = 'institute'
            }

            const token = await userCredentials.user.getIdToken()
            set({ user: token, userType: userType })
          } catch (error: any) {
            set({ isLoading: false })
            return error.message as string
          } finally {
            set({ isLoading: false })
          }
        }
      }),
      { name: 'loginStore' }
    )
  )
)

const useLogOutStore = create(() => ({
  handleLogOut: () => {
    try {
      auth.signOut()
      localStorage.removeItem('loginStore')
      useLoginStore.setState({ user: null })
      return
    } catch (error: any) {
      return error.message as string
    }
  }
}))

export { useSignUpStore, useRegisterInstituteStore, useLoginStore, useLogOutStore }
