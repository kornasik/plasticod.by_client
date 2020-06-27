import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/user`;

class UserService {
    static getUser(email, password) {
        return axios.post(`${url}/login`, {
            email,
            password
        })
    }

    static loadDataForUser(token) {
        return axios.post(`${url}/data-user`, {
            token
        })
    }

    static insertUser(user) {
        return axios.post(`${url}/registration`, {
            ...user
        });
    }

    static deleteUser(token) {
        return axios.post(`${url}/delete-user`, {
            token
        })
    }

    static updateUser(token, user) {
        return axios.post(`${url}/update-user`, {
            ...user,
            token: token
        })
    }


    static getAllUsers() {
        return axios.get(`${url}/get-all-users`)
    }
}

export default UserService;