import axios from 'axios';

const url = 'http://localhost:5000/api/about';

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