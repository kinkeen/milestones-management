import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

import {
    Timeline,
    Card,
    InputTextarea,
    InputText,
    Calendar,
    Button,
    Toolbar,
    Sidebar,
    Fieldset
  } from "../../helpers/ui.modue";

import MilestonesService from '../../services/MilestonesService';
import moment from "moment";

import "./MilestoneDetails.scss";

const MilestoneDetails = () => {
    const { id } = useParams();
    const [milestone, setMilestone] = useState({});

    const service = new MilestonesService();

    useEffect(() => {
        service.get(id).then(response => {
            setMilestone(response)
        })
    }, [])

    const string2Date = (date) => {
        console.log(date, moment.utc(date).toDate());
        return moment.utc(date).toDate();
      };
    
    // KINERET:
    // HERE YOU NEED TO CALL MILESTONE SERVICE TO GET THE DATA FROM SERVER

    return (

                <React.Fragment>

                <Card className="x-milestone-details">

                <Fieldset legend="MILESTONE DETAILS" >
                
                <div className="p-fluid">
                    <div className="p-field p-grid">
                    <label htmlFor="id" className="p-col-12 p-md-3">
                        ID
                    </label>
                    <div className="p-col-6 p-md-9">
                        <InputText id="id" type="text" value={milestone.id} disabled />
                    </div>
                    </div>

                    <div className="p-field p-grid">
                    <label htmlFor="projectname" className="p-col-12 p-md-3">
                        Milestone Name
                    </label>
                    <div className="p-col-6 p-md-9">
                        <InputText
                        id="name"
                        type="text"
                        value={milestone.name}
                        disabled
                        />
                    </div>
                    </div>

                    <div className="p-field p-grid">
                    <label htmlFor="description" className="p-col-12 p-md-3">
                        Description
                    </label>
                    <div className="p-col-12 p-md-9 ">
                        <InputTextarea
                        id="description"
                        value={milestone.description}
                        disabled
                        />
                    </div>
                    </div>

                    <div className="p-field p-grid">
                    <label htmlFor="dateEnd" className="p-col-12 p-md-2">
                        Date End
                    </label>
                    <div className="p-col-12 p-md-4 ">
                        <Calendar
                        id="dateEnd"
                        value={string2Date(milestone.dateEnd)}
                        disabled
                        />
                    </div>

                    <label htmlFor="estimateDateEnd" className="p-col-4 p-md-2">
                        Estimate Date End
                    </label>
                    <div className="p-col-8 p-md-4">
                        <Calendar
                        id="estimateDateEnd"
                        value={string2Date(milestone.estimateDateEnd)}
                        disabled
                        />
                    </div>
                    </div>

                    <div className="p-field p-grid">
                    <label htmlFor="estimatePrice" className="p-col-4 p-md-2">
                        Estimate Price
                    </label>
                    <div className="p-col-8 p-md-4 ">
                        <InputText
                        id="estimatePrice"
                        type="text"
                        value={milestone.estimatePrice}
                        disabled
                        />
                    </div>

                    <label htmlFor="actualPrice" className="p-col-4 p-md-2">
                        Actual Price
                    </label>
                    <div className="p-col-8 p-md-4 ">
                        <InputText
                        id="actualPrice"
                        type="text"
                        value={milestone.actualPrice}
                        disabled
                        />
                    </div>
                    </div>
                </div>

                <Card className="x-milestone-signatures">
                    <Fieldset legend="MILESTONE SIGNATURES" >
                    <div>
                            {
                                (milestone.signatures || []).map(item => (<div><img src={item.signature} /></div>))
                            }
                    </div>
                    </Fieldset>
                </Card>

                </Fieldset>  
                </Card>


  
    </React.Fragment>

    )

                }
export default MilestoneDetails;