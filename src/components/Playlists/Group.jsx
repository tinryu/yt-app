import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { Card, Col, Row } from 'react-bootstrap';
import { getItemOfList } from "../../playlist";
// import Pagination from 'react-js-pagination';

export default function Playlists(props) {
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
    return (
        <>
            <Row xs={2} md={5} className="g-4 p-4">
                {lists.map(item =>
                    <Col key={item.playlistId}>
                        <Link to={'/play-list/'+item.playlistId+'/'+item.id} onClick={() => openPlaylist(item.playlistId)}>
                            <Card className="bg-dark text-white p-1">
                                <Card.Img src={item.thumbnail.medium.url ? item.thumbnail.medium.url : "../assets/icon/music-icon.svg"} className=""/>
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
