import axios from 'axios';

const url = 'http://localhost:5000/api/example';

class ExampleUsingService {
    static getExampleUsing() {
        return axios.get(url)
    }

    static insertExampleUsing(example) {
        return axios.post(url, {
            ...example
        });
    }

    static updateExampleUsing(example) {
        return axios.post(`${url}/update-example`, {
            ...example
        })
    }
}

export default ExampleUsingService;