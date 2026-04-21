import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result);
                    setLoading(false);
                },
                (error) => {
                    setError(error);
                    setLoading(false);
                }
            )
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <>
            {loading ? (
                <div>Загрузка...</div>
            ) : (
                <>
                    <button onClick={fetchUsers}>Обновить</button>

                    {error && <p>Ошибка</p>}

                    <ul>
                        {users.map(user => (
                            <li key={user.id}>{user.title}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}

export default App