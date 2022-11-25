import "./Grid.css";
import { useOutletContext, Link } from "react-router-dom";

export default function Playlists(props) {
    const lists = props.lists;
    const [items, setItems] = useOutletContext({
        itemId: '',
        rand: null,
        listId: '',
        isGroup: false
    });
    function openPlaylist(idVid, index) {
        setItems({
            itemId: idVid,
            rand: index,
            listId: props.idList,
            isGroup: false
        });
    }
    return (
        <>
            <div className="grid list-item">
                <div className="g-row head">
                    <div className="tracklist-row">
                        <div className="grid-cell">#</div>
                        <div className="grid-cell c-start">Titile</div>
                        <div className="grid-cell c-start">Date Create</div>
                    </div>
                </div>
                {lists.map((item, index) =>
                    <div className="g-row" key={item.idVid}>
                        <div className="tracklist-row">
                            <div className="grid-cell">{index}</div>
                            <div className="grid-cell c-start" onClick={() => openPlaylist(item.idVid, index)}>
                                <img src={item.thumbnail.default && item.thumbnail.default.url ? item.thumbnail.default.url : "./assets/icon/music-icon.svg"} alt={item.title} width={40} height={40} />
                                <div className="title">
                                    <Link to="">{item.title}</Link>
                                </div>
                            </div>
                            <div className="grid-cell c-start">{item.publishedAt}</div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
