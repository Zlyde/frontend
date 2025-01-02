export const userRegister =  async (name, email, password) => {
  const url = 'http://localhost:5001/api/auth/register'

  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password })
  }

  const response = await fetch(url, requestOptions)
  return response
}

export const userLogin = async (email, password) => {
  const url = 'http://localhost:5001/api/auth/login'

  const requestOptions = {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  }

  const response = await fetch(url, requestOptions)
  return response
}
