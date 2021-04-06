import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { UserContext } from '../../App';
import GoogleAuth from '../SignUp/GoogleAuth';
import './Login.css';
import { initializeLoginFramework, signInWithEmailAndPassword } from '../SignUp/SignUpManager';

const Login = () => {
    const [existingUser, setExistingUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '', 
        error: '',
        success: false
    });

    initializeLoginFramework()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };

    const handleLoginBlur = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        if(inputName === 'email'){
            const userInfo = {...existingUser}
            userInfo[inputName] = inputValue;
            setExistingUser(userInfo)
        }
        if(inputName === 'password'){
            const userInfo = {...existingUser}
            userInfo[inputName] = inputValue;
            setExistingUser(userInfo)
        }
    }

    const handleLoginSubmit = (e) => {
        if(existingUser.email && existingUser.password){
          signInWithEmailAndPassword(existingUser.email, existingUser.password)
          .then(res => {
            setLoggedInUser(res)
            history.replace(from)
          })
          .catch(error => {
            setLoggedInUser(error)
          })
        }
        e.preventDefault()
    }
    return (
        <div>
            <Header></Header>
            <div className="login-container"> 
                <h1>Login</h1>
                <p className="text-red">{loggedInUser.error}</p>
                <form onSubmit={handleLoginSubmit} className="login-form">
                    <input type="email" name="email" onBlur={handleLoginBlur} placeholder="Email" required/>
                    <br/>
                    <input type="password" name="password" onBlur={handleLoginBlur} placeholder="Password" required/>
                    <input type="submit" value="Login" id="login-submit"/>
                </form>
                <div className="checkbox-password-reset-container">
                    <div className="checkbox-container">
                        <input type="checkbox" name="Remember Me" id="checkbox"/>
                        <label htmlFor="Remember Me">Remember Me</label>
                    </div>
                    <div>
                        <p className="forgot-password">Forget Password</p>
                    </div>
                </div>
                <p>Don't have an account? <Link to="/signup" className="text-orangered">Create an account</Link></p>
            </div>
            <p>Or</p>
            <GoogleAuth></GoogleAuth>
            <div style={{marginBottom: '20px'}}></div>
        </div>
    );
};

export default Login;