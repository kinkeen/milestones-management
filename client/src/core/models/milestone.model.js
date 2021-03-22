import StatusType from '../enums/StatusType';
import moment from 'moment';


export default class Milestone {

    constructor(milestone) {
        this.id = milestone.id || '';
        this.projectId = milestone.projectId || '';
        this.name = milestone.name || '';        
        this.description = milestone.description || '';        
        this.status = milestone.status || StatusType.INIT;
        this.dateStart = milestone.dateStart ||  new Date();
        this.estimateDateEnd = milestone.estimateDateEnd || new Date();
        this.dateEnd = milestone.dateEnd || new Date();
        this.estimatePrice = milestone.estimatePrice || 0.0;
        this.actualPrice = milestone.actualPrice || 0.0;
        this.creationDate = milestone.creationDate || new Date();

    }

}