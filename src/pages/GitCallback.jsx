import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

const GitCallback = () => {
  const navigate = useNavigate()
  const { login } = useUserContext()

  useEffect(() => {
    
    const user = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
  
        if (storedUser && storedToken) {
          navigate('/')
          return
        }

        const query = new URLSearchParams(window.location.search)
        const token = query.get('token')
        const userStr = query.get('user')

        if (!token || !userStr) {
          navigate('/login')
          return
        }
        
        const user = JSON.parse(decodeURIComponent(userStr))
        console.log('User Logged In', user, token)
        login(user, token)
        navigate('/')
      } catch (error) {
        console.log('Failed', error)
        navigate('/login')
      }
    }

    user()
  }, [login, navigate])
  return (
    <div>
      Logging in...
    </div>
  )
}

export default GitCallback
