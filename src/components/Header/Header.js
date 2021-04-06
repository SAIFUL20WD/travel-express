import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleSignOut } from '../SignUp/SignUpManager';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const signOut = () => {
        handleSignOut().then(res => setLoggedInUser(res))
    }
    
    return (
        <header>
            <nav>
                <div>
                    <Link to="/" className="link"><h2>Travel Express</h2></Link>
                </div>
                <div>
                    <ul className="nav-ul">
                        <Link to="/home" className="link"><li>Home</li></Link>
                        <Link to="/destination/BIKE" className="link"><li>Destination</li></Link>
                        <Link to="/blog" className="link"><li>Blog</li></Link>
                        <Link to="/contact" className="link"><li>Contact</li></Link>
                        {loggedInUser.isSignedIn ? 
                            <li><span className="text-bold">{loggedInUser.name}</span>
                                <button onClick={signOut} className="sign-out-btn">Sign Out</button>
                            </li> 
                            : <Link to="/login" className="link"><li><button className="login-btn">Login</button></li></Link>
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;