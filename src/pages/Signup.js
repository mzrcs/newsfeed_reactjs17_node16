import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password, confirmPassword)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <label>Confirm Password:</label>
      <input 
        type="password" 
        onChange={(e) => setconfirmPassword(e.target.value)} 
        value={confirmPassword} 
      />

      <button disabled={isLoading}>
        {isLoading && 
        <i className="fa fa-spinner fa-spin" style={{'marginRight':'10px'}}></i>} 
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup