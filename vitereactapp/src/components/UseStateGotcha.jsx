import React, { useState } from 'react'
const UseStateGotcha = () => {
  const [value, setValue] = useState(0)
  const handleClick = () => {
    // console.log(value)
    // setValue(value + 1)
    setTimeout(() => {
      console.log('clicked the button')
      setValue((currentState) => {
        return currentState + 1
      })
    }, 0)
  }
  return (
    <div>
      <h1>{value}</h1>
      <button className="btn" onClick={handleClick}>
        increase
      </button>
    </div>
  )
}
export default UseStateGotcha
