import { useState, useEffect} from 'react'

const Test = () => {
  const [cat, setCat] = useState(null)

  const fetchData = () => {
    fetch('https://cataas.com/cat')
    .then((res) => res.blob())
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob)
      setCat(imageUrl)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div>
    {cat ? <img src={cat} alt="random cat" /> : <p>Loading...</p>}
    </div>
  )
}

export default Test