import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ListGroup, Button, } from 'react-bootstrap';
import { database } from "../../firebase/firebase";

export default function List(props) {
    let navigate = useNavigate();
    const lists = props.data ? props.data : [];
    async function delPlaylist(id) {
        let objRef = await database.ref('/lists/'+id);
        objRef.remove();
        navigate('/play-list')
    }
    return (
        <>
            <ListGroup bsPrefix="list-personal-playlist" as="ul">
                {lists.map(item => 
                 <ListGroup.Item as="li" key={item.playlistId}>
                    <Link className="me-2" to={'/play-list/'+item.playlistId+'/'+item.id} onClick={() => openPlaylist(item.playlistId)}>
                        {item.title}
                    </Link>
                    <Button variant="danger" className="" style={{padding: "0", width: "25px"}} onClick={() => {delPlaylist(item.id)}}>x</Button>
                </ListGroup.Item>
                )}
               
            </ListGroup>
        </>
    )
}
