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
  const url = 'http://localhost:5001/api/auth/login';

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error('Inloggning misslyckades');

    const data = await response.json();

    // Kontrollera om backend har skickat en felmeddelande
    if (data.error) {
      throw new Error(data.error);
    }

    // Spara användardata i localStorage
    localStorage.setItem('userId', data.user.userId); // Spara userId
    localStorage.setItem('name', data.user.name);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('role', data.user.role);
    localStorage.setItem('token', data.token); // Spara token

    return data; // Returnera användardetaljer och token
  } catch (error) {
    console.error('Inloggning misslyckades:', error);
    throw error;
  }
};
