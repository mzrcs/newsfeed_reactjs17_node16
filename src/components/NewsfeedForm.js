import { useState } from "react"
import { useNewsfeedsContext } from "../hooks/useNewsfeedsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { fetchInterceptor } from "../utility/fetchInterceptor"
import { NEWSFEED_API_URL } from "../utility/constants"

const NewsfeedForm = () => {
  const { dispatch } = useNewsfeedsContext()
  const { user } = useAuthContext()

  const [query, setQuery] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [category, setCategory] = useState('')
  const [sources, setSources] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const newsfeed = {q:query, from, to, category, sources}

    const unregister = fetchInterceptor();
    
    const response = await fetch(NEWSFEED_API_URL, {
      method: 'POST',
      body: JSON.stringify(newsfeed)
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.message.join("\r\n"))
    }
    if (response.ok) {
      setQuery('')
      setFrom('')
      setTo('')
      setCategory('')
      setSources('')
      setError(null)
      dispatch({type: 'SET_NEWSFEEDS', payload: json.body})
    }
    setIsLoading(false)
    unregister();
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add Filter</h3>

      <label>Keyword:</label>
      <input 
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        required
        value={query}
      />

      <label>From:</label>
      <input 
        type="date"
        onChange={(e) => setFrom(e.target.value)}
        value={from}
      />

      <label>To:</label>
      <input 
        type="date"
        onChange={(e) => setTo(e.target.value)}
        value={to}
      />

      <label>Category:</label>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Select Category</option>
        <option value="general" selected={category == 'general'}  >General</option>
        <option value="business" selected={category == 'business'}  >Business</option>
        <option value="entertainment" selected={category == 'entertainment'}  >Entertainment</option>
        <option value="health" selected={category == 'health'}  >Health</option>
        <option value="science" selected={category == 'science'}  >Science</option>
        <option value="sports" selected={category == 'sports'}  >Sports</option>
        <option value="technology" selected={category == 'technology'}  >Technology</option>
      </select>

      <label>Sources:</label>
      <select onChange={(e) => setSources(e.target.value)}>
        <option>Select Sources</option>
        <option value="abc-news" selected={sources == 'abc-news'} >ABC News</option>
        <option value="argaam" selected={sources == 'argaam'} >Argaam</option>
        <option value="al-jazeera-english" selected={sources == 'al-jazeera-english'} >Al Jazeera English</option>
        <option value="buzzfeed" selected={sources == 'buzzfeed'} >Buzzfeed</option>
        <option value="bbc-news" selected={sources == 'bbc-news'} >BBC News</option>
        <option value="bbc-sport" selected={sources == 'bbc-sport'} >BBC Sport</option>
        <option value="cnn" selected={sources == 'cnn'} >CNN</option>
        <option value="medical-news-today" selected={sources == 'medical-news-today'} >Medical News Today</option>
        <option value="national-geographic" selected={sources == 'national-geographic'} >National Geographic</option>
      </select>

      <button disabled={isLoading}>
        {isLoading && 
        <i className="fa fa-spinner fa-spin" style={{'marginRight':'10px'}}></i>} 
        Update Filter!
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NewsfeedForm