
import { useState, useEffect } from 'react'
import "./App.css"


function App() {
  // add this state
  const [apiUsers, setApiUsers] = useState([])
  const [searchItem, setSearchItem] = useState('')
  // set the initial state of filteredUsers to an empty array
  const [filteredUsers, setFilteredUsers] = useState([])


  // fetch the users
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        setApiUsers(data.users)
        // update the filteredUsers state
        setFilteredUsers(data.users)
      })
      .catch(err => console.log(err))
  }, [])

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = apiUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }


  return (
    <>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      {filteredUsers.length === 0
        ? <p>No users found</p>
        : <ul>
          {filteredUsers.map(user => <li key={user.id}>{user.firstName}</li>)}
        </ul>
      }      
    </>
  )
}

export default App