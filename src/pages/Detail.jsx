import React, { useEffect, Suspense } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { getItemOfList, getPlayListById } from "../playlist";
import Grid from "../components/Playlists/Grid";

export async function loader({ params }) {
  const list = await getItemOfList(params.playlistId);
  const playlist = await getPlayListById(params.Id);
  return { list, playlist };
}

export default function Detail() {
  const { list, playlist } = useLoaderData();
  const [items, setItems] = useOutletContext({
    itemId: '',
    rand: null,
    listId: '',
    isGroup: false
  });
  return (
    <>
      <div className="heading">
        <div className="img-cover">
          <div className="playlist-image">
            <img src={list[0].thumbnail.standard.url ?  list[0].thumbnail.standard.url : "../assets/icon/music-icon.svg"} alt="Ten playlist" width={232} height={232} />
          </div>
        </div>
        <div className="destription">
            <h2 className="object">Playlist</h2>
            <span>
              <h1 className="title">{playlist.title}</h1>
            </span>
            <h2 className="tags">
              <div className="suggest-list">
                {/* <a href="">Lê Cát Trọng Lý</a>, 
                <a href="">Chillies</a>, 
                <a href="">Bùi Lan Hương</a> and more */}
              </div>
            </h2>
        </div>
      </div>
      <Grid idList={playlist.playlistId} lists={list} />
    </>
  );
};