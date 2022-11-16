import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
const Player = React.lazy(() => import('../components/Player/Player'));
const NavLeft = React.lazy(() => import('../components/Nav/NavLeft'));
const NavTop = React.lazy(() => import('../components/Nav/NavTop'));
import useWindowDimensions from '../components/Player/UseWindowDimensions';

export default function Layout() {
  const { height } = useWindowDimensions();
  const [items, setItems] = useState({
    itemId: '',
    rand: null,
    listId: 'RDq6YmhSgPgbk',
    isGroup: true
  });

  return (
    <>
      <div className="top-container">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="top-bar">
            <NavTop />
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
