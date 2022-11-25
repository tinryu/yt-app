import React, { useEffect, useReducer, useRef } from 'react';
import './Player.css';
import useFetch from './UseFech';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Player(props) {
  const [player, setPlayer] = useState<YouTubePlayer>();
  const opts: YouTubeProps['opts'] = {
    height: '40',
    width: '70',
    playerVars: {
      autoplay: 1,
      controls: 0
    },
  };
  const types = {
    TOOGLE: 'TOOGLE',
    TOOGLEPLAY: 'TOOGLEPLAY',
    ADDLISTVID: 'ADDLISTVID',
    UPDATERAND: 'UPDATERAND',
    MULTOOGLE: 'MULTOOGLE',
    UPDATEVID: 'UPDATEVID',
    UPDATEPID: 'UPDATEPID',
    UPDATEVOL: 'UPDATEVOL',
    LOADING: 'LOADING',
  }
  const initalValue = {
    videoid: '',
    rand: null,
    listVid: [],
    isTogglePlay: false,
    isMute: false,
    title: '',
    imageUrl: '',
    volume: 100,
    isLoading: false,
    channelTitle: '',
    totalLength: 1,
    currentPosition: 0,
    selectedTrack: 0,
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case types.TOOGLEPLAY:
        return { ...state, isTogglePlay: action.isTogglePlay };
      case types.MULTOOGLE:
        return { ...state, ...action.multi };
      case types.ADDLISTVID:
        return { ...state, listVid: action.listVid };
      case types.UPDATERAND:
        return { ...state, rand: action.rand };
      case types.UPDATEVID:
        return { ...state, videoid: action.videoid };
      case types.LOADING:
        return { ...state, isLoading: action.isLoading };
      case types.UPDATEVOL:
        return { ...state, volume: action.volume };
      // case types.SETTOTAL:
      //   return { ...state, totalLength: action.totalLength };
      // case types.CURRENTPOS:
      //   return { ...state, currentPosition: action.currentPosition };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initalValue);
  const { data } = useFetch(props.playlistId);

  useEffect(() => {
    dispatch({ type: types.LOADING, isLoading: false })
    if (data)
      dispatch({ type: types.ADDLISTVID, listVid: data })
    if(player)
      player?.stopVideo();
  }, [data, props.rand]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.listVid && state.listVid.length > 0) {
      let calcu;
      if (props.rand !== null)
        calcu = props.rand;
      else
        calcu = Math.floor(Math.random() * state.listVid.length);

      dispatch({ type: types.UPDATERAND, rand: calcu })
    }
  }, [state.listVid, props.rand]);

  useEffect(() => {
    let rand = state.rand !== null ? state.rand : 0;
    let videoid;

    if (props.videoId !== '')
      videoid = props.videoId;
    else
      videoid = state.listVid[rand] && state.listVid[rand].idVid;

    dispatch({ type: types.UPDATEVID, videoid: videoid });
    loadCover(rand);
  }, [state.rand, state.listVid]);

  function loadCover(rand) {
    dispatch({
      type: types.MULTOOGLE,
      multi: {
        isLoading: true,
        isToggle: true,
        isTogglePlay: false,
        title: state.listVid[rand]?.title,
        imageUrl: state.listVid[rand]?.idVid ? state.listVid[rand]?.idVid + `/0.jpg` : "",
        channelTitle: state.listVid[rand]?.channelTitle
      }
    })
  }

  async function onReady(event) {
    var rand = state.rand;
    await setPlayer(event.target)
    await player?.stopVideo();
    await player?.setPlaybackQuality("small");
    await loadCover(rand);

    if (event.target.getPlayerState() !== 5) {
      dispatch({ type: types.TOOGLEPLAY, isTogglePlay: false })
    }
  }
  async function onStateChange(event) {
    console.log('onSC', await event.target.getPlayerState());
    if (await event.data === 1)
      playButton(true);
    else
      playButton(false);

    if (await event.target.getPlayerState() === 1)
      playButton(true);
    else
      playButton(false);
  }
  function onError(event) {
    if (event.data === 150) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The owner of the requested video does not allow it to be played in embedded players, Please press next song',
      })
    } else if (event.data === 100) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private',
      })
    }
  }
  function playButton(play) {
    play ? dispatch({ type: types.TOOGLEPLAY, isTogglePlay: true }) : dispatch({ type: types.TOOGLEPLAY, isTogglePlay: false })  
  }
  async function onPlay() {
    if (await player?.getPlayerState() === YouTube.PlayerState.BUFFERING || await player?.getPlayerState() === YouTube.PlayerState.ENDED) {
      pauseVideo();
    } else if (await player?.getPlayerState() === YouTube.PlayerState.PAUSED) {
      playVideo();
    } else if (await player?.getPlayerState() === YouTube.PlayerState.CUED) {
      playVideoCue();
    } else {
      console.log('this video unstarted');
    }
  }
  async function playVideoCue() {
    await player?.loadVideoById({ videoId: state.listVid[state.rand].idVid });
    dispatch({ type: types.TOOGLEPLAY, isTogglePlay: true })
  }
  async function playVideo() {
    await player?.playVideo();
    dispatch({ type: types.TOOGLEPLAY, isTogglePlay: true })
  }
  async function pauseVideo() {
    await player?.pauseVideo();
    dispatch({ type: types.TOOGLEPLAY, isTogglePlay: false })
  }
  async function stopVideo() {
    await player?.stopVideo();
  }
  function prevSong() {
    var rand = state.rand;
    playButton(false);
    stopVideo();
    if (rand - 1 < 0)
      rand = state.listVid.length - 1;
    else
      rand -= 1;

    dispatch({ type: types.UPDATERAND, rand: rand })
    checkPrivateBack();
    player?.loadVideoById({ videoId: state.listVid[rand].idVid });
    dispatch({ type: types.MULTOOGLE, multi: { title: state.listVid[rand].title, imageUrl: state.listVid[rand].idVid + `/0.jpg` } })
    playButton(true);
  }
  function nextSong() {
    var rand = state.rand;
    playButton(false);
    stopVideo();

    if (rand + 1 === state.listVid.length)
      rand = 0;
    else
      rand += 1;

    dispatch({ type: types.UPDATERAND, rand: rand })
    checkPrivate();
    player?.loadVideoById({ videoId: state.listVid[rand].idVid });
    dispatch({ type: types.MULTOOGLE, multi: { title: state.listVid[rand].title, imageUrl: state.listVid[rand].idVid + `/0.jpg` } })
    playButton(true);
  }
  function checkPrivate() {
    var rand = state.rand;
    if (state.listVid[rand] && (state.listVid[rand].title === "Private video"
      || state.listVid[rand].title === "Deleted video")) {
      if (rand === state.listVid.length - 1)
        rand = 0;
      else
        rand += 1;

      checkPrivate();
      dispatch({ type: types.UPDATERAND, rand: rand })
    }
  }
  function checkPrivateBack() {
    var rand = state.rand;
    if (state.listVid[rand] && (state.listVid[rand].title === "Private video" || state.listVid[rand].title === "Deleted video")) {
      if (rand === 0)
        rand = state.listVid.length - 1;
      else
        rand -= 1;

      checkPrivateBack();
      dispatch({ type: types.UPDATERAND, rand: rand })
    }
  }
  function changeVolume(event) {
    dispatch({ type: types.UPDATEVOL, volume: event.target.value })
    player?.setVolume(event.target.value);
  }
  function muteVol() {
    if (!state.isMute) {
      player?.mute();
      dispatch({ type: types.MULTOOGLE, multi: { isMute: true, volume: 0 } })
    } else {
      player?.unMute();
      dispatch({ type: types.MULTOOGLE, multi: { isMute: false, volume: 100 } })
    }
  }
  function setLoop(flag: boolean) {
    player?.setLoop(flag);
  }
  function setShuffle(flag: boolean) {
    player?.setShuffle(flag);
  }
  return (
    <>
      <div className="Root__now-playing-bar">
        <footer className="playing-footer">
          <div className="wrap-total">
            <div className="wrap-1">
              <div className="cover-image">
                {state.isLoading ?
                  <img src={state.imageUrl !== '' ? `https://img.youtube.com/vi/` + state.imageUrl : ``} alt="" className="cover-art-image" /> :
                  <svg height="45px" viewBox="-18 0 512 512" width="60px" xmlns="http://www.w3.org/2000/svg">
                    <path d="m446.121094 165.035156v118.015625c-15.859375-14.148437-36.757813-22.761719-59.632813-22.761719-49.449219 0-89.679687 40.230469-89.679687 89.679688 0 49.453125 40.230468 89.683594 89.679687 89.683594s89.679688-40.230469 89.679688-89.683594v-192.550781zm0 0" />
                    <path d="m476.167969 126.417969v-126.417969l-326.855469 82.855469v126.417969zm0 0" />
                    <path d="m149.3125 240.273438v115.125c-15.859375-14.148438-36.757812-22.761719-59.632812-22.761719-49.449219 0-89.679688 40.230469-89.679688 89.683593 0 49.449219 40.230469 89.679688 89.679688 89.679688 49.390624 0 89.582031-40.128906 89.679687-89.496094h.003906v-189.847656zm0 0" />
                  </svg>
                }
              </div>
              <div className="context-item">
                <div className="context-item-info-title">
                  <span><a href="/">{state.title ? state.title : 'song'}</a></span>
                </div>
                <div className="context-item-info-artist">
                  <span><a href="/">{state.channelTitle ? state.channelTitle : 'channel'}</a></span>
                </div>
              </div>
              <div className="group-pop">
                <YouTube
                  videoId={state.videoId}
                  opts={opts}
                  onReady={onReady}
                  onStateChange={onStateChange}
                  className="yt-player"
                  onError={onError}
                />
              </div>
            </div>
            <div className="wrap-2">
              <div className="player">
                <div className="player-controls__buttons">
                  <div className="player-controls__left">
                    <button className="shuffle" onClick={() => setShuffle(true)}>
                      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                        <path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"></path><path d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"></path>
                      </svg>
                    </button>
                    <button onClick={prevSong} className="prev-button" aria-label="prev">
                      <svg role="img" height="16" width="16" viewBox="0 0 16 16" >
                        <path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path>
                      </svg>
                    </button>
                  </div>
                  {state.isTogglePlay ?
                    <button className='play-button' onClick={pauseVideo} id="btn" aria-label="play">
                      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                        <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
                      </svg> </button> :
                    <button className='play-button' onClick={onPlay} id="btn" aria-label="play">
                      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                        <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                      </svg>
                    </button>
                  }
                  <div className="player-controls__right">
                    <button onClick={nextSong} className="next-button" aria-label="next">
                      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                        <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path>
                      </svg>
                    </button>
                    <button className="repeat" onClick={() => setLoop(true)}>
                      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
                        <path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* <div className="seekbar">
                  <SeekBar trackLength={state.totalLength} currentPosition={state.currentPosition} />
                </div> */}
              </div>
            </div>
            <div className="wrap-3">
              <div className="volume-bar">
                <button className="volume-bar__icon-button control-button" aria-label="Mute" onClick={muteVol}>
                  {state.isMute ?
                    <svg role="presentation" height="16" width="16" aria-label="Volume off" className="volume-off" viewBox="0 0 16 16" >
                      <path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path>
                      <path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
                    </svg>
                    :
                    <svg role="presentation" height="16" width="16" aria-label="Volume high" className="volume_high" viewBox="0 0 16 16">
                      <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path>
                      <path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path>
                    </svg>
                  }
                </button>
                <div className="vol">
                  <input onChange={changeVolume} type="range" id="volume" name="volume" value={state.volume} min="0" max="100" className="styled-slider slider-progress" />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
