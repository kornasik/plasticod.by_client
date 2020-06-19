import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/about`;

class AboutService {
    static getAbout() {
        return axios.get(url)
    }

    static insertAbout(about) {
        return axios.post(`${url}`, {
            ...about
        });
    }

    static updateAbout(about) {
        return axios.post(`${url}/update-about`, {
            ...about
        })
    }
}

export default AboutService;