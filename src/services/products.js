import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/product`;

class PostService {
    static getProducts() {
        return axios.get(url)
    }

    static insertProducts(product) {
        return axios.post(url, {
            product
        });
    }

    static uploadFile(product) {
        return axios.post(`${url}/upload`, {
            product
        });
    }

    static  deleteProducts(id) {
        return axios.delete(`${url}/${id}`)
    }

    static updateProduct(product){
        return axios.post(`${url}/update`, {
            product
        })
    }
}

export default PostService;