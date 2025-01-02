export const fetchCities = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/city')
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
