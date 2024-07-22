import { useEffect, useState } from 'react'

const DogPicture = (props: any) => {
  const [imageUrl, setImageUrl] = useState('')

  console.log('into')

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.message)
      })
  }, [])

  return (
    <div>
      <img src={imageUrl} alt="a dog" />
    </div>
  )
}

export { DogPicture }
