import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

export default function NavTop() {
    const userLogin = JSON.parse(localStorage.getItem("user"));

    const [location, setLocation] = useState('');
    const lastLocation = useRef('');

    const btnback = useRef();
    const btnforward = useRef();
    
    let navigate = useNavigate();
    let path = useLocation();
    
    useEffect(() => {
        setLocation(path.pathname);
        lastLocation.current = location;
        // if(location === '') {
        //     btnback.current.style.cursor  = "not-allowed";
        // } else {
        //     btnback.current.style.cursor  = "not-allowed";
        // }
        // if(lastLocation.current === '' || lastLocation.current === location) {
        //     btnforward.current.style.cursor  = "not-allowed";
        // }
    }, [path.pathname, location]);

    function backHistory() {
        if(location !== '') {
            navigate(-1);
        }
    }
    function forward() {    
        if(lastLocation.current)
            navigate(lastLocation.current);
    }

    function logIn() {
        navigate('/login');
    }
    function logOut() {
        auth.signOut();
        localStorage.clear();
        navigate('/login');
    }
    
    return (
        <>
            <header>
            {path && path.pathname === '/' || path.pathname === '/contact' ? <div></div> :
                <div className="breadcrumb">
                    <button ref={btnback} className="me-2 border border-0 rounded top-bar-back-button" onClick={() => backHistory()}>
                        <svg role="img" height="30" width="30" className="" viewBox="0 0 24 24">
                            <path d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"></path>
                        </svg>
                    </button>
                    <button ref={btnforward} className="border border-0 rounded top-bar-forward-button" onClick={() => forward()}>
                        <svg role="img" height="30" width="30" className="" viewBox="0 0 24 24">
                            <path d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"></path>
                        </svg>
                    </button>
                </div>
            }
                <>
                    {   !userLogin ? 
                        <div className="logOut">
                            <button className="btn btn-outline-light form-control login" type="button" onClick={logIn}>Log in</button>
                        </div>
                         :
                        <div className="btn-group">
                            <button className="btn btn-light btn-sm dropdown-toggle d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="text-nowrap me-2" style={{width: '7em', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                                    {userLogin.displayName ? userLogin.displayName : userLogin.email }
                                </span>
                                {userLogin.photoURL ? 
                                <img width={30} height={30} className="rounded-circle" src={userLogin.photoURL} alt={userLogin.displayName ? userLogin.displayName : ''} /> :
                                // <span className="border rounded-circle" style={{background: '#181818'}}>Img</span>
                                <img width={25} height={25} className="rounded-circle" src='/assets/icon/profile-user.svg' alt="user" />
                                }
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item form-control">Infomation</Link></li>
                                <li className="dropdown-item"><button className="btn btn-outline-dark form-control logout" type="button" onClick={logOut}>Log out</button></li>
                            </ul>
                        </div>
                    }
                    
                </>
            </header>
        </>
    )
}
