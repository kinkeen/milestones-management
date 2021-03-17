

import axios from "axios";

export default class MilestonService {
    url = '/api/milestons';    


    constructor() {
    }

    retrive() {
        return axios.get(this.url).then(res => res.data);
    }

    get(id) {
        return axios.get(`${this.url}/${id}`).then(res => res.data);
    }

    // put(id, mileston) {
    //     return axios.put(`${this.url}/${id}`, mileston);
    // }

    // post(project) {
    //     return axios.post(`${this.url}`, mileston);
    // }

    delete(id) {
        return axios.delete(`${this.url}/${id}`);
    }
}