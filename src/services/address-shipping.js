import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/address-shipping`;

class AddressShippingService {
    static getShippingService() {
        return axios.get(url)
    }

    static insertShippingService(addressShipping) {
        return axios.post(url, {
            ...addressShipping
        });
    }

    static updateShippingService(addressShipping) {
        return axios.post(`${url}/update-address`, {
            ...addressShipping
        })
    }

    static  deleteAddress(id) {
        return axios.delete(`${url}/${id}`)
    }
}

export default AddressShippingService;