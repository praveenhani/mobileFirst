import React, { useState } from 'react';
import './index.css'

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [regError, setRegError] = useState(false)
    
    
    const [regUsername, setRegUsername] = useState('');
    const [regPassword, setRegPassword] = useState('');
    // const [regDone, setRegDon] = useState(false);
    const [showReg, setShowReg] = useState(false);

  const handleRegister = () => {
      // Store credentials in localStorage
      if (regUsername !== '' && regPassword !== '') {
          localStorage.setItem('username', regUsername);
            localStorage.setItem('password', regPassword);
      // Call the onRegister function passed from parent component
      setShowReg(false);
      } else {
          setRegError(true);
      }
  };
  const handleLogin = () => {
    // Retrieve credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (username === storedUsername && password === storedPassword) {
        // Call the onLogin function passed from parent component
      onLogin();
    } else {
          if (password !== storedPassword && username === '') {
            setError("Provide Username")
        } else if (username !== storedUsername && password === '') {
            setError("Provide Password")
        }else {
            setError('Invalid username or password');
        }
    }
    };
    const renderReg = () => (
        <div className='login-info'>
            <h2 className='header'>Registration</h2>
            <div className='reg-card'>
                <div className='username-input'>
                    <label htmlFor="reg-username">UserName</label>
                    <input
                        id='reg-username'
                        className='username'
                        type="text"
                        placeholder="Username"
                        value={regUsername}
                        onChange={(e) => setRegUsername(e.target.value)}
                        />
                </div>
                <div className='password-input'>
                    <label htmlFor="reg-password">Password</label>
                    <input
                        id='reg-password'
                        className='password'
                        type="password"
                        placeholder="Password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                    />
                </div>
                <button className='register-button' onClick={handleRegister}>Register</button>
                {regError? <p className='error'>provide details</p>:''}
            </div>
    </div>
    )
    const handleShowReg = () => (
        setShowReg(true)
    )
    const renderLogin = () => (
        <div className='login-info'>
            <h2 className='header'>Login</h2>
            <div>
                <div className='username-input'>
                    <label htmlFor="username">UserName</label>
                    <input
                        className='username'
                        id='username'
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='password-input'>
                    <label htmlFor="password">Password</label>
                    <input
                        id='password'
                        className='password'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
            </div>
            <div className='buttons'>
            
                <button className='register-button' onClick={handleLogin}>Login</button>                   
               
                    <button className='register-button' onClick={handleShowReg}>Register</button>
                </div> 
            </div> 
            {error && <p className='error'>{error}</p>}
    </div>
    )
    return (
        <div className='login-container'>
            {showReg ?renderReg(): renderLogin() }
      </div>

  );
};

export default LoginForm;