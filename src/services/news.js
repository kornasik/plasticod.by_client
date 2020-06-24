import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/news`;

class NewsService {
    static getNews() {
        return axios.get(url)
    }

    static insertNews(news) {
        return axios.post(url, {
            ...news
        });
    }

    static  deleteNews(id) {
        return axios.delete(`${url}/${id}`)
    }

    static updateNews(id, news){
        return axios.post(`${url}/update`, {
            ...news,
            id: id
        })
    }
}

export default NewsService;