import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/info-support`;


class InfoSupportService {
    static addFile(name, file) {
        return axios.post(`${url}/add`, {
            name, file
        })
    }

    static deleteFile(idFile) {
        return axios.delete(`${url}/delete/${idFile}`)
    }

    static getAllFiles() {
        return axios.get(`${url}`)
    }
}

export default InfoSupportService;