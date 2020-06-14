import axios from 'axios';

const url = 'http://localhost:5000/api/groups';

class GroupsService {
    static getGroups() {
        return axios.get(url)
    }

    static insertGroups(group) {
        return axios.post(url, {
            group
        });
    }

    static  deleteGroups(id) {
        return axios.delete(`${url}/${id}`)
    }

    static updateGroups(id, group){
        group.id = id;
        return axios.post(`${url}/update`, {
            group
        })
    }
}

export default GroupsService;