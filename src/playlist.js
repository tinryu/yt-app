import {database} from './firebase/firebase';
import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY_YT;

export async function getPlayList(total = 250) {
    var data = await database.ref('lists').limitToLast(total).once('value').then(function (snapshot) {
        return snapshot.val();
    })
    var da = Object.entries(data).map(function (item) {
        item[1].id = item[0];
        return item;
    })
    var arr = da.map((k) => k[1]);
    return arr;
}
export async function getPlayListById(id) { 
    var data = await database.ref('/lists/'+id).once('value').then(function (snapshot) {
        return snapshot.val();
    })
    return data;
}
export async function getItemOfList(idList, isLength) {
    const data = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
            part: 'id,snippet',
            maxResults: 30,
            playlistId: idList,
            key: apiKey,
        }
    }).then(res => {
        let list = [];
        let arr = res.data;
        arr.items.forEach(i => {
            if(i.snippet.title === "Private video" || i.snippet.title === "Deleted video") {
                // not import item to arr
            } else {
                list.push({ 
                    title: i.snippet.title,
                    idVid: i.snippet.resourceId.videoId,
                    thumbnail: i.snippet.thumbnails,
                    publishedAt: i.snippet.publishedAt,
                    channelTitle: i.snippet.channelTitle ? i.snippet.channelTitle : 'Youtube'
                })
            }
        });
        if(isLength === 1) {
            return list.length;
        } else {
            return list;
        }
    });
    return data;
}
