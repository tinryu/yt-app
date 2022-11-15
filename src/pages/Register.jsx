import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate();

    function RegisterWithEmailAndPassword() {
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            var user = userCredential.user;
            console.log('user', user);
            navigate('/')
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
        })
    }
    return (
        <div className="divRegister">
            <div className="register-head">
                <div className="dududulogin">
                    <img alt="" src={"/assets/icon/dududu.png"} width="35" height="35" className="" />
                    <p>Dududu</p>
                </div>
            </div>
            <div className="register-body">
                <div className="register-wrap">
                    <Form className="register-form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                            <Button variant="danger" type="button" className="col" onClick={RegisterWithEmailAndPassword}>
                                sign up
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}
