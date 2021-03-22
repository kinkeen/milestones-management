import moment from 'moment';


export default class Project {
    
    constructor(project) {
        this.id = project.id || '';
        this.ownerId = project.ownerId || '';
        this.name = project.name || '';        
        this.description = project.description || '';        
        this.dateStart = project.dateStart ||  new Date();
        this.estimateDateEnd = project.estimateDateEnd || new Date();
        this.dateEnd = project.dateEnd || new Date();
        this.estimatePrice = project.estimatePrice || 0.0;
        this.actualPrice = project.actualPrice || 0.0;
        this.creationDate = project.creationDate || new Date();
        //milestones: [];
        //users: [];
    }
}
