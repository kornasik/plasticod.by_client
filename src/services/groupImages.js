import axios from 'axios';
import {HOST} from "./config";

const url = `${HOST}/api/group-images`;

class GroupImagesService {
    static getGroupImages(id) {
        return axios.post(`${url}/images`, {
            id: id
        })
    }
    static getAllGroupsImages() {
        return axios.get(`${url}/all-group-images`)
    }

    static insertImagesGroup({pathImage, groupId}) {
        return axios.post(`${url}/insert`, {
            pathImage: pathImage,
            groupId: groupId
        });
    }

    static deleteGroupImage(id) {
        return axios.delete(`${url}/delete/${id}`)
    }
}

export default GroupImagesService;