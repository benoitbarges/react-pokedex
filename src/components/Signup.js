import React, { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

const Signup = () => {
  const history = useHistory()
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault()
    const formData = new FormData(event.target)
    const params = Object.fromEntries(formData)

    axios.post('http://localhost:3000/trainers', { trainer: params })
      .then(response => {
        localStorage.setItem('authorizationToken', response.headers.authorization)
        localStorage.setItem('currentTraineId', response.data.status.data.id)
        history.push('/')
      })
      .catch(error => {setError(error.response.data.status.errors.join(', '))})
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label className="flex column">Email
        <input type="text" name="email" required />
      </label>
      <label className="flex column">Password
        <input type="password" name="password" required />
      </label>
      <button type="submit" className="btn submit">
        Submit
      </button>
      <Link to='/sign_in'>
        Sign in here if you already have a pokedex
      </Link>
      {error && <p className='center-text error'>{error}</p>}
    </form>
  )
}

export default Signup
