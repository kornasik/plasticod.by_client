import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/product-images`;

class ProductImagesService {
    static getProductImages(id) {
        return axios.post(`${url}/images`, {
            id: id
        })
    }
    static getAllImages() {
        return axios.get(`${url}/all-image`)
    }

    static insertImagesProduct({image, productId}) {
        return axios.post(`${url}/insert`, {
            image: image,
            productId: productId
        });
    }

    static deleteProductImage(id) {
        return axios.delete(`${url}/delete/${id}`)
    }
}

export default ProductImagesService;