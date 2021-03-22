import axios from "axios";

export default class MilestonesService {
    url = '/api/milestones';

    constructor() {
    }

    retrive() {
        return axios.get(this.url).then(res => res.data);
    }

    get(id) {
        return axios.get(`${this.url}/${id}`).then(res => res.data);
    }

    put(id, milestone) {
        
        console.log("id=",id);
        console.log("milestone=",milestone);

        return axios.put(`${this.url}/${id}`, milestone);
    }

    post(milestone) {
        return axios.post(`${this.url}`, milestone);
    }

    delete(id) {
        return axios.delete(`${this.url}/${id}`);
    }
}