import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function List(props) {
    const lists = props.data;
    return (<>
        <Row xs={2} md={5} className="g-4 p-4">
            {lists && lists.map((item, key) =>
                <Col key={key}>
                    <Card className="bg-dark text-white p-1">
                        <Card.Img src={item.thumbnail.medium.url ? item.thumbnail.medium.url : "../assets/icon/music-icon.svg"} className="" variant="top" />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    </>)
}
