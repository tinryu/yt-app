import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
const Player = React.lazy(() => import('../components/Player/Player'));
const NavLeft = React.lazy(() => import('../components/Nav/NavLeft'));
import useWindowDimensions from '../components/Player/UseWindowDimensions';

export default function Layout() {
  const { height } = useWindowDimensions();
  const [items, setItems] = useState({
    itemId: '',
    rand: null,
    listId: 'RDq6YmhSgPgbk',
    isGroup: true
  });
  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     var uid = user.uid;
  //     // console.log(uid);
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  return (
    <>
      <div className="top-container">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="top-bar">
            <header className="">
              <div className="">
                <button data-testid="top-bar-back-button" aria-label="Go back" className="">
                  <svg role="img" height="24" width="24" className="" viewBox="0 0 24 24">
                    <path d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"></path>
                  </svg>
                </button>
                <button aria-label="Go forward" disabled="" className="">
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
          </div>
          <div className="nav-bar-left">
            <NavLeft />
          </div>
          <div className="main-view" style={{ height: height - 90 }}>
            <div className="main-view-container">

              <Outlet context={[items, setItems]} />
            </div>
          </div>
          <div className="now-playing-bar">
            <Player playlistId={items.listId} rand={items.rand} videoId={items.itemId} isGroup={items.isGroup} />
          </div>
        </Suspense>
      </div>
    </>
  )
};
