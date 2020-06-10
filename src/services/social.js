import axios from 'axios';

const url = 'http://localhost:5000/api/social';

class SocialService {
    static getSocial() {
        return axios.get(url)
    }

    static updateSocial(socials){
        return axios.put(`${url}/update`, socials)
    }

    static createSocial(socials){
        return axios.post(url, socials)
    }
}

export default SocialService;