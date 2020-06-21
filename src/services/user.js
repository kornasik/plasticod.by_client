import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/user`;

class UserService {
    static getUser(email, password) {
        return axios.post(url, {
            email,
            password
        })
    }

    static loadDataForUser(token) {
        return axios.post(`${url}/login`, {
            token
        })
    }

    static addOrder(token, order) {
        return axios.post(`${url}/add-order`, {
            token, order
        })
    }

    static getOrders(token) {
        return axios.post(`${url}/get-orders`, {
            token
        })
    }

    static insertUser(user) {
        return axios.post(`${url}/registration`, {
            ...user
        });
    }

    static deleteUser(id) {
        return axios.delete(`${url}/${id}`)
    }

    static updateUser(id, user) {
        return axios.put(`${url}/${id}`, user)
    }


    static getAllUsers() {
        return axios.get(`${url}/get-all-users`)
    }
}

export default UserService;