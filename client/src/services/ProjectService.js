import axios from "axios";

export default class ProjectService {
    url = '/api/projects';

    constructor() {
    }

    retrive() {
        return axios.get(this.url).then(res => res.data);
    }

    get(id) {
        return axios.get(`${this.url}/${id}`).then(res => res.data);
    }

    put(id, project) {
        return axios.put(`${this.url}/${id}`, project);
    }

    post(project) {
        return axios.post(`${this.url}`, project);
    }

    delete(id) {
        return axios.delete(`${this.url}/${id}`);
    }
}