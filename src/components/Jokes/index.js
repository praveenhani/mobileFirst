import './index.css'

const Jokes = (props) => {
    const {jokes} = props 
    const {joke, safe} = jokes
    return (
        <li className="list">
            <h1 className='jokes'>{joke}</h1>
        </li>
    )
}

export default Jokes;