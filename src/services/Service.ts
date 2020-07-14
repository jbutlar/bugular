const url = `${process.env.REACT_APP_BASE_URL}`

export default {
    async get(path) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${url}/api/${path}`).then(async response => {
                    if (response.status === 403) {
                        //history.replace('/error/unauthorized')
                        reject()
                    }
                    else if (response.status === 401) {
                        const { url } = await response.json()
                        //history.replace('/error/unauthenticated')
                        window.location = url
                        reject()
                    } else {
                        resolve(response)
                    }                    
                }).catch(console.log)
        })
    },
    async post(path, body) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${url}/api/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(async response => {
                if (response.status === 403) {
                    //history.replace('/error/unauthorized')
                    reject()
                } else if (response.status === 401) {
                    const { url } = await response.json()
                    //history.replace('/error/unauthenticated')
                    window.location = url
                    reject()
                } else {
                    resolve(response)
                }
            }).catch(console.log)
        })
    },
    async put(path, body) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${url}/api/${path}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(async response => {
                if (response.status === 403) {
                    //history.replace('/error/unauthorized')
                    reject()
                } else if (response.status === 401) {
                    const { url } = await response.json()
                    console.log('the url was: ', url)
                   // history.replace('/error/unauthenticated')
                    window.location = url
                    reject()
                } else {
                    resolve(response)
                }
            }).catch(console.log)
        })
    },
    async delete(path) {
        return new Promise((resolve, reject) => {
            return fetch(`${url}/api/${path}`, { method: 'DELETE' }).then(async response => {
                if (response.status === 403) {
                   // history.replace('/error/unauthorized')
                    reject()
                }
                else if (response.status === 401) {
                    const { url } = await response.json()
                    //history.replace('/error/unauthenticated')
                    window.location = url
                    reject()
                } else {
                    resolve(response)
                }
            }).catch(console.log)
        })
    }
}