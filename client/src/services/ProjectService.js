import axios from "axios";

export default class ProjectService {
    url = '/api/projects';

    constructor() {
    }

    retrive() {
        return axios.get(this.url).then(res => res.data);
    }

    get(id) {
        console.log('SERVICE: ', id)
        return axios.get(`${this.url}/${id}`).then(res => res.data);
    }
    // put()
    post(project) {
        axios.post(`${this.url}`, project);
    }
    delete(ids) {
        // IMPLENMNT PROJECT DELETION HERE
    }
}