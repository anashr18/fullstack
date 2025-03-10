import { useState } from 'react'

const Ternery = () => {
  const [user, setUser] = useState(null)
  const login = () => {
    setUser('I am a user')
  }
  const logout = () => {
    setUser(null)
  }

  return (
    <div>
      {user ? (
        <div>
          <h4>Welcome, {user}</h4>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button className="btn" onClick={login}>
            Login
          </button>
        </div>
      )}
    </div>
  )
}
export default Ternery
