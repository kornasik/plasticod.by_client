import axios from 'axios';

const url = 'http://localhost:5000/api/general';

class GeneralService {
    static createGeneral(general){
        return axios.post(`${url}`, general)
    }

    static getGeneral() {
        return axios.get(url)
    }

    static updateGeneral(general) {
        return axios.put(`${url}/update`, general);
    }
}

export default GeneralService;