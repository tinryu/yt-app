// import Group from '../components/Playlists/Group'
import React, { Suspense } from "react";
const Group = React.lazy(() => import('../components/Playlists/Group'));
import { useLoaderData } from 'react-router-dom';
import { getPlayList } from "../playlist";

export async function loader() {
  const userLogin = JSON.parse(localStorage.getItem("user"));
  let playlist = [];
  if(userLogin) {
    playlist = await getPlayList(250, userLogin.uid);
  }
  return { playlist };
}

export default function PlayList(props) {
  const { playlist } = useLoaderData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Group data={playlist} />
    </Suspense>
  )
};
