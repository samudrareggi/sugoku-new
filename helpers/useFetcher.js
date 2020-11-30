
import { useState, useEffect} from 'react'

function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setData(data)
        }, 1000)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url])

  return [data, loading, setData]
}

export default useFetch