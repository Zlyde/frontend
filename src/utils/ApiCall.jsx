import API_VERSION from "../config/api_version"

export const fetchCities = async () => {
  try {
    const response = await fetch(`http://localhost:5001${API_VERSION}/city`)
    if (!response.ok) {
      throw new Error('could not fetch cities')
    }
    // console.log(response)
    return await response.json()
  } catch (error) {
    console.log('Error fetching cities', error)
    return []
  }
}
