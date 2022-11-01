import { useState, useEffect } from "react";
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_YT;

const useFetch = (playlistID) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetData() {
            setLoading('loading...')
            setData(null);
            setError(null);
            await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: {
                    part: 'id,snippet',
                    maxResults: 30,
                    playlistId: playlistID,
                    key: apiKey,
                    // pageToken: tokenKey
                }
            }).then(res => {
                // res.data.nextPageToken && setToken(res.data.nextPageToken);
                let list = [];
                let arr = res.data;
                arr.items.forEach(i => {
                    list.push({ 
                        title: i.snippet.title,
                        idVid: i.snippet.resourceId.videoId,
                        thumbnail: i.snippet.thumbnails,
                        publishedAt: i.snippet.publishedAt,
                        channelTitle: i.snippet.channelTitle ? i.snippet.channelTitle : 'Youtube'
                    });
                });
                res.data && setData(list);
                // if(token) {
                //     console.log('token',token);
                // }
            }).catch(error => {
                setLoading(false)
                setError('An error occurred. Awkward..')
            })
        }
        fetData();
    }, [playlistID]);// eslint-disable-line react-hooks/exhaustive-deps

    return { data, loading, error }
};

export default useFetch;