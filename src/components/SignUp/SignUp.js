import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import GoogleAuth from './GoogleAuth';
import { createUserWithEmailAndPassword, initializeLoginFramework } from './SignUpManager';
import './SignUp.css';

const SignUp = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '', 
        error: '',
        success: false
    })

    initializeLoginFramework()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const handleBlur = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        let isFieldValid = true;
        if(inputName === 'name'){
            isFieldValid = inputValue;
        }
        if(inputName === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(inputValue);
        }
        if(inputName === 'password'){
          const isPasswordHasNumber = /\d{1}/.test(inputValue);
          const isPasswordValid = inputValue.length > 6;
          isFieldValid = isPasswordValid && isPasswordHasNumber
        }
        if(inputName === 'confirmPassword'){
            if(user.password === inputValue){
                isFieldValid = true
            }
            else{
                alert("password don't match")
            }
        }
        if(isFieldValid){
          const newUserInfo = {...user}
          newUserInfo[inputName] = inputValue;
          setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        if(user.name && user.password && user.email){
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => setLoggedInUser(res))
            .catch(error => setLoggedInUser(error))       
        }
    e.preventDefault()
    }

    return (
        <div>
            <Header></Header>
            <div className="sign-up-container">
                <h2>Create an account</h2>
                {loggedInUser.success ? 
                        <div>
                            <p className="text-green">Hello! Your account has been created successfully</p>
                            <p className="text-green">Please, Login with email and password</p>
                        </div>
                    : <p className="text-red">{loggedInUser.error}</p>
                }
                <form onSubmit={handleSubmit} className="sign-up-form">
                    <input type="text" name="name" onBlur={handleBlur} placeholder="Name" required/>
                    <br/>
                    <input type="email" name="email" onBlur={handleBlur} placeholder="Email" required/>
                    <br/>
                    <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                    <br/>
                    <input type="password" name="confirmPassword" onBlur={handleBlur} placeholder="Confirm Password" required/>
                    <br/>
                    <input type="submit" value="Create an account" id="sign-up-submit"/>
                </form>
                <p>Already have an account? <Link to="/login" className="text-orangered">Login</Link></p>
            </div>
            <p>Or</p>
            <GoogleAuth></GoogleAuth>
            <div style={{marginBottom: '20px'}}></div>
        </div>
    );
};

export default SignUp;