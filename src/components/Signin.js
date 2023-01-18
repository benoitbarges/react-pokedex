import React, { useState } from 'react'
import axios from 'axios'
import { useHistory, Link, useLocation } from 'react-router-dom'

const Signin = () => {
  const history = useHistory()
  const location = useLocation()
  const [error, setError] = useState(location?.state?.error || null)

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault()
    const formData = new FormData(event.target)
    const params = Object.fromEntries(formData)

    axios.post('http://localhost:3000/trainers/sign_in', { trainer: params })
      .then(response => {
        localStorage.setItem('authorizationToken', response.headers.authorization)
        localStorage.setItem('currentTraineId', response.data.status.trainer.id)
        window.dispatchEvent( new CustomEvent('watchToken') )
        history.push('/')
      })
      .catch(error => setError(error?.response?.data))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <label className="flex column">Email
        <input type="text" name="email" required />
      </label>
      <label className="flex column">Password
        <input type="password" name="password" required />
      </label>
      <button type="submit" className="btn submit">
        Submit
      </button>
      <Link to='/sign_up'>
        Sign up here if you need a pokedex
      </Link>
      {error && <p className='center-text error'>{error}</p>}
    </form>
  )
}

export default Signin
