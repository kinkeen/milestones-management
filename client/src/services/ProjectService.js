import axios from "axios";

export default class ProjectService {
    url = '/api/projects';

    constructor(url) {
        this.url = url;
    }

    retrive() {
        return axios.get(this.url).then(res => res.data);
    }

    get(id) {
        return axios.get(`${this.url}/${id}`).then(res => res.data);
    }
    // put()
    // post()
    // delete(id)
}