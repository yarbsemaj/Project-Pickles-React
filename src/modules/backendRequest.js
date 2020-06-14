import config from "../config"

export default function makeRequest(url, method, includeKey, body) {
    // grab current state
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (includeKey) {
        const token = localStorage.getItem('token');
        requestOptions.headers.Authorization = "Bearer " + token
    }
    if (body) {
        requestOptions.body = JSON.stringify(body)
    }
    return fetch(config.baseURL + "/" + url, requestOptions)
    .then(res => res.json())
}