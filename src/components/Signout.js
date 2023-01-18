import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Signout = () => {
  const history = useHistory()

  const signout = () => {
    axios.delete(
      'http://localhost:3000/trainers/sign_out',
      { headers: { 'Authorization': localStorage.getItem('authorizationToken') } }
    ).then(() => {
      history.push('/sign_in')
      localStorage.clear()
    })
  }

  return <button className='btn submit' onClick={signout}>Sign Out</button>
}

export default Signout
