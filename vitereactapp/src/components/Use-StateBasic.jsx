import { useState } from 'react'
const UseStateBasic = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  console.log(useState())
  // console.log(useState('jo koy'))
  const value = useState()[0]
  const handler = useState()[1]
  console.log(value, handler)
  return (
    <div>
      <h3>You clicked btn {count} times</h3>
      <button className="btn" onClick={handleClick}>
        Click me
      </button>
    </div>
  )
}
export default UseStateBasic
