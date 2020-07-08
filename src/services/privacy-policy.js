import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/privacy-policy`;

class PrivacyPolicyService {
    static getPrivacy() {
        return axios.get(url)
    }

    static insertPrivacy(privacy) {
        return axios.post(`${url}`, {}, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }, {
            ...privacy
        });
    }

    static updatePrivacy(privacy) {
        return axios.post(`${url}/update-privacy`, {
            ...privacy
        })
    }
}

export default PrivacyPolicyService;