import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/general`;

class GeneralService {
    static createGeneral(general){
        return axios.post(`${url}`, general, {
            header : {
                'Content-Type': 'application/json'
            }
        })
    }

    static getGeneral() {
        return axios.get(url)
    }

    static updateGeneral(general) {
        return axios.put(`${url}/update`, general);
    }
}

export default GeneralService;