import { useState } from 'react'
import data from './data'
const FormChallenge = () => {
  const [users, setUsers] = useState(data)
  const [name, setName] = useState('null')
  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(name)
    if (!name.trim()) return
    const fakeid = Date.now()
    setUsers([...users, { id: fakeid, name: name }])
    setName('')
  }
  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};</button>
    </form>
  );
};      </div>
    </div>
  );
};
}
