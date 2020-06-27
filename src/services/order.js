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
}

export default OrderService;