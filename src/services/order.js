import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/order`;


class OrderService {
    static addOrder(token, order) {
        return axios.post(`${url}/create`, {
            token, order
        })
    }

    static getOrders(token) {
        return axios.post(`${url}/orders-user`, {
            token
        })
    }

    static getAllOrders() {
        return axios.get(`${url}/all-orders`)
    }

    static updateOrder(order, token) {
        return axios.post(`${url}/update`, {
            order, token
        })
    }

    static deleteOrder(id) {
        return axios.delete(`${url}/delete/${id}`)
    }
}

export default OrderService;