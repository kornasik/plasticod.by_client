import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/social`;

class SocialService {
    static getSocial() {
        return axios.get(url)
    }

    static updateSocial(socials){
        return axios.post(`${url}/update`, socials)
    }

    static createSocial(socials){
        return axios.post(url, socials)
    }
}

export default SocialService;