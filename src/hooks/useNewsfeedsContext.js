import { NewsfeedsContext } from '../context/NewsfeedContext'
import { useContext } from 'react'

export const useNewsfeedsContext = () => {
  const context = useContext(NewsfeedsContext)

  if (!context) {
    throw Error('useNewsfeedsContext must be used inside an NewsfeedsContextProvider')
  }

  return context
}