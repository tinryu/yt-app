import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavTop() {
    const [location, setLocation] = useState('');
    const btnback = useRef();
    const btnforward = useRef();
    const lastLocation = useRef('');
    let navigate = useNavigate();
    let path = useLocation();
    
    useEffect(() => {
        setLocation(path.pathname);
        lastLocation.current = location;
        if(location === '') {
            btnback.current.style = "cursor: not-allowed";
        } else {
            btnback.current.style = "cursor: pointer";
        }
        if(lastLocation.current === '' || lastLocation.current === location) {
            btnforward.current.style = "cursor: not-allowed";
        }
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
    return (
        <>
            <header className="">
                <div className="">
                    <button ref={btnback} className="top-bar-back-button" onClick={() => backHistory()}>
                        <svg role="img" height="24" width="24" className="" viewBox="0 0 24 24">
                            <path d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"></path>
                        </svg>
                    </button>
                    <button ref={btnforward} className="top-bar-forward-button" onClick={() => forward()}>
                        <svg role="img" height="24" width="24" className="" viewBox="0 0 24 24">
                            <path d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z"></path>
                        </svg>
                    </button>
                </div>
                <button className="" type="button">
                    <span dir="auto" className="">Tín Trương</span>
                    <svg role="img" height="16" width="16" className="" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M14 6l-6 6-6-6h12z"></path>
                    </svg>
                </button>
            </header>
        </>
    )
}
