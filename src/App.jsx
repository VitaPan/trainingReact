import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false)

    const fetchUsers = () => {
        setError(null);
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Ошибка запроса')
                }
                return res.json()
            })
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
            {
                error ? (
                        <p>Ошибка загрузки: {error?.message || 'что-то пошло не так'}</p>
                ) :
                    loading ? (
                        <div>Загрузка...</div>
                    ) : (
                        <>
                            <button onClick={fetchUsers}>Обновить</button>
                            <button onClick={() => setShowAll(false)}>Показать 10</button>
                            <button onClick={() => setShowAll(true)}>Показать всех</button>

                            <ul>
                                {(showAll ? users : users.slice(0, 10)).map(user => (
                                    <li key={user.id}>{user.title}</li>
                                ))}
                            </ul>
                        </>
                    )
            }
        </>
    )
}

export default App