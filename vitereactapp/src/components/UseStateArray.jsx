import { data } from '../data'
import React from 'react'
import { useState } from 'react'

const UseStateArray = () => {
  const [people, setPeople] = useState(data)
  const removePerson = (id) => {
    let filteredPeople = people.filter((person) => person.id !== id)
    setPeople(filteredPeople)
  }
  return (
    <div>
      {people.map((person) => {
        const { id, name } = person
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button onClick={() => removePerson(id)}>Remove</button>
          </div>
        )
      })}
      <button
        className="btn"
        style={{ marginTop: '2rem' }}
        onClick={() => {
          setPeople([])
        }}
      >
        Remove All
      </button>
    </div>
  )
}
export default UseStateArray
