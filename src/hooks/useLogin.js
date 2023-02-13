import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { fetchInterceptor } from '../utility/fetchInterceptor'
import {LOGIN_API_URL} from '../utility/constants'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    
    const unregister = fetchInterceptor();
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password })
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
      dispatch({type: 'LOGIN', payload: body})

      // update loading state
      setIsLoading(false)
    }
    unregister();
  }

  return { login, isLoading, error }
}