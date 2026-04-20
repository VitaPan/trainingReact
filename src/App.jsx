import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)

    const fetchUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result)
                },
                (error) => {
                    setError(error)
                }
            )
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <button onClick={fetchUsers}>Обновить</button>

            {error && <p>Ошибка</p>}

            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.title}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App