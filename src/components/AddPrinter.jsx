//react hook imports
import React, { useState, useRef, useContext, useEffect } from 'react';

//Icon imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

//Form element imports
import { Container, Form, Button, InputGroup, CloseButton } from 'react-bootstrap';

//api import
import ApiContext from './Api_context';


import './main.css';
library.add(faEyeSlash, faEye);

export default function Add_printer(props) {
    const api = useContext(ApiContext);
    const IsAddingPrinter = props.done;
    const [icon_name, set_icon_name] = useState("eye");
    const [valid, set_valid] = useState({ name: true, ip: true, apikey: true });
    const ApiKey = useRef();
    const Name = useRef();
    const Ip = useRef();
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])



    function handle_eye_click(event) {
        event.preventDefault();
        let is_hidden = (ApiKey.current.type === 'password')
        ApiKey.current.type = is_hidden ? "text" : "password";
        let new_eye = is_hidden ? "eye-slash" : "eye";
        if (!isMounted) return;
        set_icon_name(new_eye)
    }

    async function Handle_Submit(event) {
        if (!isMounted) return;
        event.preventDefault();
        event.stopPropagation();
        let validation = { name: true, ip: true, apikey: true }
        //check if Ip.current.value is an ip address
        if (!Ip.current.value.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
            validation.ip = false;
        }

        //check if name.current.value is not bigger than 20 chars
        if (Name.current.value.length > 20) {
            validation.name = false;
        }

        if (validation.name && validation.ip && validation.apikey) {
            console.log(Ip.current.value, ApiKey.current.value);
            let result = await api.addPrinter(Ip.current.value, ApiKey.current.value, Name.current.value);
            if (result.data.logged_in) {
                if (!isMounted) return;
                return IsAddingPrinter(false);
            } else {
                if (result.error === 'ECONNREFUSED' || result.error === 'ECONNABORTED') {
                    validation.ip = false;
                } else {
                    validation.apikey = false;
                }
            }
        }
        if (!isMounted) return;
        set_valid(validation);
    }
    return (
        <Container className="add-printer bg-dark mw-100" style={{ height: '100vh', margin: '0', padding: '0' }}>
            <Form style={{ "width": "fit-content", background: "white", padding: "20px", borderRadius: "15px" }} onSubmit={Handle_Submit}>
                <CloseButton onClick={() => IsAddingPrinter(false)} />
                <Form.Label className="text-info big">Add printer</Form.Label>
                <Form.Group>
                    <Form.Control type="text" placeholder="name" ref={Name} required isInvalid={!valid.name}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Name must be less than 20 characters
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group style={{ "maxWidth": "300px" }}>
                    <Form.Control type="text" placeholder="Ip address" ref={Ip} required isInvalid={!valid.ip}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Ip address must be a valid ip address
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <InputGroup >
                        <Form.Control type="password" placeholder="Api key" ref={ApiKey} required isInvalid={!valid.apikey}></Form.Control>
                        <InputGroup.Append>
                            <Button variant="light" onClick={handle_eye_click}><FontAwesomeIcon icon={icon_name} /></Button>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            Wrong api key
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Button type="submit">Add Printer</Button>
                <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => IsAddingPrinter(false)} className="cancel-button">cancel</Button>
            </Form>
        </Container>
    );
}
