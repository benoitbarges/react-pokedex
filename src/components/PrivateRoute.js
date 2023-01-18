import React, { useState, useEffect} from 'react'
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios'

// Requests authentication
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authorizationToken')
  config.headers.Authorization =  token

  return config
})

// 401 Siganture expired redirection
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('authorizationToken')
    window.dispatchEvent(new CustomEvent('watchToken', { detail: 'Session expired. Yoo need to reconnect' }))
  }
  return Promise.reject(error)
})

const PrivateRoute = ({ children, ...rest }) => {
  const [token, setToken] = useState(localStorage.getItem('authorizationToken'))
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleToken = (event) => {
      if (event?.detail) {
        setError(event.detail)
      }
      setToken(localStorage.getItem('authorizationToken'))
    }
    window.addEventListener('watchToken', (event) => handleToken(event))

    return () => {
      window.removeEventListener('watchToken', (event) => handleToken(event))
    }
  }, [])

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!token) return <Redirect to={{ pathname: '/sign_in', state: { from: location, error } }}/>

        return children
      }}
    />
  )
}

export default PrivateRoute
