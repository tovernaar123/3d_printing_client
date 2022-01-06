export class Api {
    constructor(token, setToken){
        this.token = token;
        this.setToken = setToken
    }
    async login(username, password){
        let res = await fetch(`api/user/login?username=${username}&password=${password}`)
        res = await res.json()
        if(res.login){
            this.setToken(res.token)
            this.token = res.token
        }
        return res.login
    }

    async get_printers() {
        let res = await fetch(`/api/printers?token=${this.token}`)
        res = await res.json()
        return res
    }
    
    async addPrinter(Ip, ApiKey, Name){
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }), 
            body: JSON.stringify({Ip, ApiKey, Name})
        };
        let res = await fetch(`/api/printers?token=${this.token}`, options)
        res = await res.json()
        return res
    }
}

