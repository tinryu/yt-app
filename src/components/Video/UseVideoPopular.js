import { useState, useEffect } from "react";
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY_YT;

const UseVideoPopular = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetData() {
            setLoading('loading...')
            setData(null);
            setError(null);
            await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet',
                    chart: 'mostPopular',
                    regionCode: 'VN',
                    maxResults: '25',
                    key: apiKey,
                }
            }).then(res => {
                let list = [];
                let arr = res.data;
                arr.items.forEach(i => {
                    list.push({
                        videoid: i.id,
                        title: i.snippet.title,
                        description: i.snippet.description,
                        thumbnail: i.snippet.thumbnails,
                        publishedAt: i.snippet.publishedAt,
                        channelTitle: i.snippet.channelTitle ? i.snippet.channelTitle : 'Youtube'
                    });
                });
                res.data && setData(list);
            }).catch(error => {
                setLoading(false)
                setError('An error occurred. Awkward..')
            })
        }
        fetData();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return { data, loading, error }
};

export default UseVideoPopular;