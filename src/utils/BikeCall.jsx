export const fetchBikes = async () => {
  const url = 'http://localhost:5001/api/bike'

  try {
    const response = await fetch(url)
    const bikes = await response.json()
    return bikes
  } catch (error) {
    console.log(error.message)
    return
  }
}
