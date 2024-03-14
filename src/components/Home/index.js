import { useEffect, useState } from 'react';

import Jokes from '../Jokes';
import './index.css'

const Home = ({ onLogout }) => {

    const [responseData, setResponseData] = useState([]);
    const [error, setError] = useState('');
    const [successState, setSuccesState] = useState(false);
    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
                let response = await fetch(url)
                if (response.ok === true) {
                    let data = await response.json()
                    let updateData = data.jokes.map((eachJoke) => ({
                        id: eachJoke.id,
                        joke: eachJoke.joke,
                        safe: eachJoke.safe
                   }))
                    setResponseData(updateData);
                    setSuccesState(true);
                }
                const storedUsername = localStorage.getItem('username');
                setUsername(storedUsername);

            } catch (error) {
                setError(error.massage);
                setSuccesState(false);
            }
        }
        fetchData()
    }, [])

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    onLogout();
    };



    return (
    <div className='jokes-container'>
            <nav className='nav-bar'>
                <div>
                    <div className='user-profile'>
                        {username}
                    </div>
                </div>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </nav>
            <ul className='joke-lists'>
                {successState?responseData.map((eachJoke) => (
                    <Jokes key={eachJoke.id} jokes={eachJoke} />
                )) : <h1 className="erro">{error}</h1>}
            </ul>
    </div>
  );
};

export default Home;