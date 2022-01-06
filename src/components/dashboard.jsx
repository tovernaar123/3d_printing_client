import React, { useRef, useState, useContext, useEffect } from 'react';
import { Container, Button} from 'react-bootstrap';
import AddPrinter from './AddPrinter';
import ApiContext from './Api_context';
import Navbar from './Navbar/Navbar';
import Printer_Icon from './printerIcon';
import './main.css'

export default function Dashboard() {
    const api = useContext(ApiContext);

    const [IsCreatingPrinter, SetIsCreatingPrinter] = useState(false);
    const [printers, set_printers] = useState(false);

    useEffect(() => {
        async function data() {
            let printers = await api.get_printers()
            console.log(printers);
            set_printers(printers);
        }
        data()
    }, [api])
    //<img src={camera} style={{  alignSelf: "start", marginRight: "auto", paddingTop: "10px"}}></img>
    function spawn_create_printer_window(event) {
        event.preventDefault();
        SetIsCreatingPrinter(true);
    }
    let camera = `./api/printer/0/camera?token=${api.token}`
    if (!IsCreatingPrinter) {
        if(!true) {
            return (
                <>
                    <Container className="main-grid bg-dark mw-100" style={{ height: '100%', margin: '0', padding: '0px'}}>
                    <Navbar current={1} style={{gridArea: "navbar"}}/>
                        <div style={{ marginRight: "auto", color: "white", paddingTop: '15px', paddingLeft: '10px'}} >No current printers click add to add printers.</div>
                        <Button style={{ marginBottom: "30px", gridArea: 'button', margin: '10px' }} onClick={spawn_create_printer_window}>+Add Printer</Button>
                    </Container>
                </>
            )
        }
        return (
            <>
                    <Container className="main-grid bg-dark mw-100" style={{ height: '100%', margin: '0', padding: '0px'}}>
                        <Navbar current={1} style={{gridArea: "navbar"}}/>
                        <div  className="printer-grid">
                            <Printer_Icon></Printer_Icon>
                            <Printer_Icon></Printer_Icon>
                            <Printer_Icon></Printer_Icon>
                            <Printer_Icon></Printer_Icon>
                        </div>
                        <Button style={{ marginBottom: "30px", gridArea: 'button', margin: '10px' }} onClick={spawn_create_printer_window}>+Add Printer</Button>
                    </Container>
            </>
        )
    } else {
        return <AddPrinter done={SetIsCreatingPrinter}> </AddPrinter>
    }
}
