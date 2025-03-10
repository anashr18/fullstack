import { useEffect, useState } from 'react'
const UseEffectsBasic = () => {
  const [value, setValue] = useState(0)
  const [value2, setValue2] = useState(0)
  const sayHello = () => {
    console.log('saying hello')
  }
  sayHello()
  useEffect(() => {
    console.log('Hello from use effect')
  }, [value])
  useEffect(() => {
    console.log('Hello from use effect for value2')
  }, [value2])
  return (
    <div>
      <h3>value:{value}</h3>
      <button className="btn" onClick={() => setValue(value + 1)}>
        Click me
      </button>
      <h3>value2:{value2}</h3>
      <button className="btn" onClick={() => setValue2(value2 + 1)}>
        Click me
      </button>
    </div>
  )
}
export default UseEffectsBasic
