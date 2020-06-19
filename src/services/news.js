import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/news`;

class NewsService {
    static getNews() {
        return axios.get(url)
    }

    static insertNews(description) {
        return axios.post(url, {
            ...description
        });
    }

    static  deleteNews(id) {
        return axios.delete(`${url}/${id}`)
    }

    static updateNews(id, news){
        return axios.put(url, {
            news: news,
            id: id
        })
    }
}

export default NewsService;