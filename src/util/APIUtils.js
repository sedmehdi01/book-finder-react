import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    if(localStorage.getItem(ACCESS_TOKEN)) {
        let headers = new Headers({
            'Content-Type': 'application/json',
        })
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        options.headers=headers
    }

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.status) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me/",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: loginRequest
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}