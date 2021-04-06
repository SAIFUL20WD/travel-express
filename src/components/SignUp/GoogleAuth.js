import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import googleIcon from '../../images/google-icon.png';
import './GoogleAuth.css';
import { googleSignIn, initializeLoginFramework } from './SignUpManager';

const GoogleAuth = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } };

    initializeLoginFramework()
    const handleGoogleSignIn = () => {
        googleSignIn().then(res => {
            setLoggedInUser(res)
            history.replace(from)
        })
    }
    return (
        <div className="google-auth" onClick={handleGoogleSignIn}>
            <img src={googleIcon} alt="Google Icon"/>
            <h4>Continue With Google</h4>
        </div>
    );
};

export default GoogleAuth;