import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/buy-retail`;

class BuyRetailService {
    static getBuyRetail() {
        return axios.get(url)
    }

    static insertBuyRetail(buyRetail) {
        return axios.post(`${url}/add-buy-retail`, {
            ...buyRetail
        });
    }

    static updateBuyRetail(buyRetail) {
        return axios.post(`${url}/edit-buy-retail`, {
            ...buyRetail
        })
    }
}

export default BuyRetailService;