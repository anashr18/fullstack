import React from 'react'
import { useState } from 'react'
const UseStateObject = () => {
  //   const [name, setName] = useState('Sam')
  //   const [age, setAge] = useState(23)
  //   const [hobby, setHobby] = useState('TT')
  const [person, setPerson] = useState({
    name: 'Sam12',
    age: 12,
    hobby: 'screaming',
  })
  const changeHim = () => {
    setPerson({ name: 'yugi', age: 2, hobby: 'cric' })
  }
  return (
    <div>
      <h2>{person.name}</h2>
      <h2>{person.age}</h2>
      <h2>{person.hobby}</h2>
      <button className="btn" onClick={() => changeHim()}>
        Chnage the person
      </button>
    </div>
  )
}
export default UseStateObject
