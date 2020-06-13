import axios from 'axios';

const url = 'http://localhost:5000/api/slider';

class SliderService {
    static getSlider() {
        return axios.get(url)
    }

    static insertSlider(image) {
        return axios.post(url, {
            image
        });
    }

    static addSlider(image) {
        return axios.post(`${url}/add`, {
            image
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

    static updateProduct(id, product){
        return axios.put(`${url}/${id}`, product)
    }
}

export default SliderService;