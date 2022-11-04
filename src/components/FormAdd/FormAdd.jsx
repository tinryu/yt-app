import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {database} from '../../firebase/firebase.js';

export default function FormAdd(props) {
    const [name, setName] = useState('');
    const [pId, setpId] = useState('');
    const [destription, setdes] = useState('');

    function addForm() {
        database.ref('lists/' + randString(10)).set({
            name: name,
            listId : convertLink(pId),
            destription: destription
        }, function(error) {
            if(error) {
                console.log(error);
            } else {
                console.log('good');
            }
        });
    }
    function randString(len) {
        var result = '';
        var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charLength = char.length;
        for (var i = 0; i < len; i++) {
            result += char.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    function convertLink(str) {
        var res = '';
        var arr = str.split("list=");
        arr.forEach(el => {
            if (el.indexOf('https:') === -1 || el.indexOf('http:') === -1)
                res = el
        });
        return res;
    }

    return (
        <>
        <FloatingLabel
            controlId="floatingInput"
            label="Name List"
            className="mb-3"
        >
            <Form.Control type="text" placeholder="Enter Name List" value={name} onChange={e => setName(e.target.value)}/>
        </FloatingLabel>
        <FloatingLabel
            controlId="floatingInput"
            label="ID List"
            className="mb-3"
        >
            <Form.Control type="text" placeholder="Enter ID List" value={pId} onChange={e => setpId(e.target.value)}/>
        </FloatingLabel>
        <FloatingLabel
            controlId="floatingInput"
            label="Destription List"
            className="mb-3"
        >
            <Form.Control type="text" placeholder="Enter Destription" value={destription} onChange={e => setdes(e.target.value)}/>
        </FloatingLabel>
        <Button variant="primary" type="button" onClick={addForm}>
            Submit
        </Button>
        </>
    )
}
