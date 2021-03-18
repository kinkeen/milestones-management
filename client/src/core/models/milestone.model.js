import StatusType from '../enums/StatusType';
import moment from 'moment';


export default class Milestone {

    constructor(mileston) {
        this.id = mileston.id || '';
        this.projectId = mileston.projectId || '';
        this.status = mileston.status || StatusType.WAITING_TO_ACCEPT;
        this.dateStart = mileston.dateStart ||  new Date();
        this.estimateDateEnd = mileston.estimateDateEnd || new Date();
        this.actuallDateEnd = mileston.actuallDateEnd || new Date();
        this.estimatePrice = mileston.estimatePrice || 0.0;
        this.actuallPrice = mileston.actuallPrice || 0.0;
        this.creationDate = mileston.creationDate || new Date();
    }

}