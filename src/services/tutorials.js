import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/tutorials`;

class TutorialsService {
    static getTutorials() {
        return axios.get(url)
    }

    static updateTutorials(tutorials){
        return axios.put(`${url}/1`, tutorials)
    }

    static createTutorials(tutorials){
        return axios.post(url, tutorials)
    }
}

export default TutorialsService;