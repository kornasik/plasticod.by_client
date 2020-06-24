import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/example`;

class ExampleUsingService {
    static getExampleUsing() {
        return axios.get(url)
    }

    static insertExampleUsing(example) {
        return axios.post(url, {
            ...example
        });
    }

    static deleteExample(id) {
        return axios.post(`${url}/delete`, {
            ...id
        })
    }
}

export default ExampleUsingService;