import { useAuthContext } from './useAuthContext'
import { useNewsfeedsContext } from './useNewsfeedsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchNewsfeeds } = useNewsfeedsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchNewsfeeds({ type: 'SET_NEWSFEEDS', payload: null })
  }

  return { logout }
}