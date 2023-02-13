import { createContext, useReducer } from 'react'

export const NewsfeedsContext = createContext()

export const newsfeedsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWSFEEDS': 
      return {
        newsfeeds: action.payload
      }
    default:
      return state
  }
}

export const NewsfeedsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsfeedsReducer, {
    newsfeeds: null
  })

  return (
    <NewsfeedsContext.Provider value={{...state, dispatch}}>
      { children }
    </NewsfeedsContext.Provider>
  )
}