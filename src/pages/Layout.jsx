import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Player from "../components/Player/Player";
import NavLeft from "../components/Nav/NavLeft";
import NavTop from "../components/Nav/NavTop";
import useWindowDimensions from '../components/Player/UseWindowDimensions';

export default function Layout() {
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const { height } = useWindowDimensions();
  
  const [items, setItems] = useState({
    itemId: '',
    rand: null,
    listId: 'RDq6YmhSgPgbk',
    isGroup: true
  });
  useEffect(() => {
    if (!userLogin)
      navigate("/login");
  }, []);

  return (
    <>
      { !userLogin ? <div></div> :
      <div className="top-container">
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
      </div>
      }
    </>
  )
};
