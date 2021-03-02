const apiBase = process.env.NODE_ENV ==='production' ? '/api/' : `${process.env.REACT_APP_BASE_URL}/api/`

export default {
    async get(path) {
        console.log(`inside get and here are env variables: REACT_APP_BASE_URL ${apiBase} and here is the public url ${process.env.PUBLIC_URL}`)
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${apiBase}${path}`).then(async response => {
                    if (response.status === 403) {
                        console.log(' response was 403')
                        //history.replace('/error/unauthorized')
                        reject()
                    }
                    else if (response.status === 401) {
                        console.log(' response was 401')
                        const { url } = await response.json()
                        //history.replace('/error/unauthenticated')
                        window.location = url
                        reject()
                    } else {
                        console.log(`we will resolve response which is ${response}`)
                        resolve(response)
                    }                    
                }).catch(console.log)
        })
    },
    async post(path, body) {
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${apiBase}${path}`, {
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
            return fetch(`${apiBase}${path}`, {
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
        return new Promise<Response>((resolve, reject) => {
            return fetch(`${apiBase}${path}`, { method: 'DELETE' }).then(async response => {
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