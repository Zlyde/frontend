export const fetchCities = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:5001/api/city', {
      // headers: {
      //     'x-access-token': `${token}`,
      // }
    })
    if (!response.ok) {
      throw new Error('could not fetch cities')
    }
    console.log(response)
    return await response.json()
  } catch (error) {
    console.log('Error fetching cities', error)
    return []
  }
}
