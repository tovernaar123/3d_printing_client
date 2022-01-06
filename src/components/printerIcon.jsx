import './main.css'
import React, {} from 'react';
import {Button} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
library.add(faCubes);


export default function Printer_Icon() {


    return (
        <div className="printer-icon">
            <FontAwesomeIcon icon={"cubes"} size="10x" style={{color: "red"}} />
            <p>Home printer</p>
            <Button>View</Button>
        </div>
    )
}