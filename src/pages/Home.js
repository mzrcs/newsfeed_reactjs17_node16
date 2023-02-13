import { useEffect } from 'react'
import { useNewsfeedsContext } from "../hooks/useNewsfeedsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { fetchInterceptor } from '../utility/fetchInterceptor'
import { NEWSFEED_API_URL } from '../utility/constants'

// components
import NewsfeedDetails from '../components/NewsfeedDetails'
import NewsfeedForm from '../components/NewsfeedForm'

const Home = () => {
  const { newsfeeds, dispatch } = useNewsfeedsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchNewsfeed = async () => {

      const unregister = fetchInterceptor();
      const response = await fetch(NEWSFEED_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          "q": "sports",
          "from": "2023-02-13",
          "to": "2023-02-13",
          "category": "",
          "sources": "cnn"
        })
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_NEWSFEEDS', payload: json.body })
      }
      unregister();
    }

    if (user) {
      fetchNewsfeed()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <NewsfeedForm />
      <div className="newsfeeds">
        {!newsfeeds &&
          <span style={{
            marginRight: '10px',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
            fontSize: 30
          }}>Loading...</span>}
        {newsfeeds && newsfeeds.map((newsfeed) => (
          <NewsfeedDetails key={newsfeed?.publishedAt} newsfeed={newsfeed} />
        ))}
      </div>
    </div>
  )
}

export default Home