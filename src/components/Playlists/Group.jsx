import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { Button, Card, Col, Row } from 'react-bootstrap';
import { getItemOfList } from "../../playlist";
import { database } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';
// import Pagination from 'react-js-pagination';


export default function Playlists(props) {
    let navigate = useNavigate();
    const lists = props.data;
    const [items, setItems] = useOutletContext({
        itemId: '',
        rand: null,
        listId: '',
        isGroup: true,
    });
    // const [activePage, setActivePage] = useState(15);
    async function openPlaylist(playlistId) {
        const data = await getItemOfList(playlistId);
        const rand = Math.floor(Math.random() * data.length);
        setItems({
            itemId: data[rand].idVid,
            rand: rand,
            listId: playlistId,
            isGroup: true
        });
    }
    
    async function delPlaylist(id) {
        let objRef = await database.ref('/lists/'+id);
        objRef.remove();
        navigate('/play-list')
    }
    return (
        <>
            <Row xs={2} md={5} className="g-4 p-4">
                {lists.map(item =>
                    <Col key={item.playlistId}>
                        <Link to={'/play-list/'+item.playlistId+'/'+item.id} onClick={() => openPlaylist(item.playlistId)}>
                            <Card className="bg-dark text-white">
                                {/* <Button variant="default" className="btn-close align-self-center" onClick={() => {delPlaylist(item.id)}} /> */}
                                <Card.Img src={item.thumbnail.medium.url ? item.thumbnail.medium.url : "../assets/icon/music-icon.svg"} className="p-2"/>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>
            {/* <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={150}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={(e) => {
                    setActivePage(e)
                }}
            /> */}

        </>
    )
}
