
import { useState, useEffect } from 'react'
import Input from './components/Input'
import ItemList from './components/ItemsList'
import { useGetUsers } from './components/useGetUsers'

function App() {
  const {users, loading, error} = useGetUsers()
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    if (Object.keys(users).length > 0) {
      setFilteredUsers(users)
    }
  }, [users]) 

  const filterItems = (searchTerm) => { 
    const filteredItems = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  return (
    <>
      <Input onChangeCallback={filterItems} />
      {loading && <p>Loading...</p>}
      {error && <p>There was an error loading the users</p>}
      {!loading && !error && <ItemList items={filteredUsers} />}
    </>
  )
}

export default App