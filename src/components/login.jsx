import React, { useRef, useState, useContext} from 'react'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import ApiContext from './Api_context'

library.add(faEyeSlash, faEye)


export default function Login() {
    const userName = useRef();
    const pass = useRef();
    const api = useContext(ApiContext)
    const [icon_name, set_icon_name] = useState("eye")
    const [wrong_auth, set_wrong_auth] = useState(false)


    function handle_eye_click(event) {
        event.preventDefault();
        let is_hidden = (pass.current.type === 'password')
        pass.current.type = is_hidden ? "text" : "password"
        let new_eye = is_hidden ? "eye-slash" : "eye"
        set_icon_name(new_eye)
    }
    async function handle_login_submit(event) {
        event.preventDefault();
        let password = pass.current.value
        let username = userName.current.value
        let logged_in = await api.login(username, password);
        if (logged_in) {
            set_wrong_auth(false);
        }else{
            set_wrong_auth(true);
        }   
    }
    return (
        <>
            <style type="text/css">
                {`
                .big {
                    font-size: 1.5rem;
                }
                .hand {
                    cursor: pointer;
                }
            `}
            </style>
            <Container className="d-flex justify-content-center align-items-center bg-dark mw-100" style={{ height: '100vh', margin: '0', padding: '0' }}>
                <Form style={{ "width": "fit-content" }} onSubmit={handle_login_submit}>
                    <Form.Group style={{ "maxWidth": "300px" }}>
                        <Form.Label className="text-info big">Login Form</Form.Label>
                        <Form.Control type="text" ref={userName} placeholder="User Name"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control type="password" ref={pass} placeholder="Password" ></Form.Control>
                            <InputGroup.Append onClick={handle_eye_click} className="hand">
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={icon_name} />
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        {wrong_auth &&                         
                        <Form.Text className="text-danger" sytle={{display: 'block'}}>
                            Wrong username/password.
                        </Form.Text>}
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
            </Container>
        </>
    )
}
