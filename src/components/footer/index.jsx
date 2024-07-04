import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import './index.css'

const Footer = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <div className='button'>
  <footer>
  {
                userLoggedIn
                    ?
                    <>
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='logoutBtn'>Logout</button>
                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
                    
            }
  </footer>
</div>
    )

}

export default Footer