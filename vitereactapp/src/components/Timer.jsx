import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    console.log('Timer Mounted')
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => {
      console.log('Timer Unmounted 🚀') // Runs when unmounted
      clearInterval(interval)
    }
  }, [])

  return <p>Seconds: {seconds}</p>
}

export default Timer
