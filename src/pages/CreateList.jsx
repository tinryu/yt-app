import React, { useState } from 'react';
import SearchG from "../components/Playlists/SearchG";
import database from "../firebase/firebase.js";

export default function CreateList() {
  const [data, setData] = useState({});
  const [visble, setVisble] = useState(true);
  function getData2(item) {
    item.userId = '1';
    item.userName = 'admin';
    setData(item);
    if(data) {
      setVisble(false);
    }
  }
  function addForm() {
    database.ref('lists/' + randString(10)).set(data, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('good');
        setVisble(true);
      }
    });
  }
  function randString(len) {
    var result = '';
    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charLength = char.length;
    for (var i = 0; i < len; i++) {
      result += char.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }
  return (
    <div className="p-4">
      <div className="heading" id="coverhead">
        <div className="img-cover">
          <div className="playlist-image">
            <img src={data.thumbnail && data.thumbnail.high && data.thumbnail.high.url ? data.thumbnail.high.url : "../assets/icon/music-icon.svg"} alt="img playlist" width={232} height={232} />
          </div>
        </div>
        <div className="destription">
          <h2 className="object">Playlist</h2>
          <span>
            <h1 className="title">{data.title ? data.title : 'Playlist Name'}</h1>
            <h2 className="title-channel">Channel Name: {data.channelTitle ? data.channelTitle : 'Channel Name'}</h2>
            <p className="destription">Destription: {data.description ? data.description : "Some destription about playlist"}</p>
          </span>
        </div>
        <button disabled={visble} className="btn btn-save" onClick={addForm}>Create</button>
      </div>
      <SearchG passDataTo2={getData2} />
    </div>
  )
}
