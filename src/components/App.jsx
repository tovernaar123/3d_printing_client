import React, { useState, useEffect} from 'react';
import ApiContext from './Api_context'
import { Api } from './Api'
import Login from './login';
import Dashboard from './dashboard'

function useLocalstorage(key, init_value) {
    const [value, setValue] = useState(() => {
        const json = localStorage.getItem(key)
        if (json) return JSON.parse(json)
        if (typeof init_value === 'function') {
            return init_value()
        } else {
            return init_value
        }
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue]
}



function App() {
    const [token, setToken] = useLocalstorage('token')
    let api = new Api(token, setToken)
    if (!token) {
        return (
            <ApiContext.Provider value={api}>
                <Login />
            </ApiContext.Provider>
        )
    } else {
        return (
            <ApiContext.Provider value={api}>
                <Dashboard></Dashboard>
            </ApiContext.Provider>
        )
    }
}

export default App;

