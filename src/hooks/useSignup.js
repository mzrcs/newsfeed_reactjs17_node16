import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { fetchInterceptor } from '../utility/fetchInterceptor'
import {SIGNUP_API_URL} from '../utility/constants'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (name, email, password, confirmPassword) => {
    setIsLoading(true)
    setError(null)

    const unregister = fetchInterceptor();
    const response = await fetch(SIGNUP_API_URL, {
      method: 'POST',
      body: JSON.stringify({ 
        name,
        email,
        password,
        'password_confirmation':confirmPassword, 
      })
    })
    
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message)
    }
    if (response.ok) {
      let body = json.body;
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(body))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
    unregister();
  }

  return { signup, isLoading, error }
}