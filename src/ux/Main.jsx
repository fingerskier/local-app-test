import React, {useEffect, useState} from 'react'


export default function Main() {
  const [thing, setThing] = useState('loading...')


  useEffect(() => {
    window.flarn.ghibbet()
    .then(val=>{
      setThing(val)
    })
    .catch(console.error)
  }, [])


  return <div>
    <h1>Main Stuff</h1>
    
    <p>{JSON.stringify(thing)}</p>
  </div>
}