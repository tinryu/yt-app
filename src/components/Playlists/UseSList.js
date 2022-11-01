import { useState, useEffect } from "react";
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_YT;

const useSList = (keyword) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    async function fetData() {
        setLoading('loading...')
        setData(null);
        setError(null);
        await axios.get('https://www.googleapis.com/youtube/v3/search', {
            cancelToken: source.token,
            params: {
                part: 'id,snippet',
                maxResults: 50,
                q: keyword,
                key: apiKey,
                type: 'playlist',
                order: ['videoCount','viewCount'],
            }
        }).then(res => {
            let list = [];
            let arr = res.data;
            
            arr.items.forEach(i => {
                list.push({ 
                    playlistId: i.id.playlistId,
                    title: i.snippet.title,
                    thumbnail: i.snippet.thumbnails,
                    publishedAt: i.snippet.publishedAt,
                    channelId: i.snippet.channelId,
                    channelTitle: i.snippet.channelTitle ? i.snippet.channelTitle : 'Youtube',
                    description: i.snippet.description,
                })
            });
            res.data && setData(list);
        }).catch(err => {
            if(axios.isCancel(err)) {
                return "axios request cancelled";
            }
            setLoading(false)
            setError('An error occurred. Awkward..')
            return err;
        })
    }
    useEffect(() => {
        if(keyword) {
            fetData();
        }
        return () => {
            source.cancel("axios request cancelled");
        };
    }, [keyword]);

    return { data, loading, error }
};

export default useSList;