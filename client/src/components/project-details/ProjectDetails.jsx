import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router, Link,
  useParams
} from "react-router-dom";


import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

import './ProjectDetails.scss';

import ProjectService from "../../services/ProjectService";
import MilestoneItem from '../milestone-item/MilestoneItem'

const ProjectDetails = () => {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const service = new ProjectService();

  useEffect(() => {
    service.get(id).then((data) => {

      console.log(data)

      setProject(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const milestones = [
    {
      status: "Ordered",
      date: "15/10/2020 10:30",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      image: "game-controller.jpg",
      number: 1
    },
    {
      status: "Processing",
      date: "15/10/2020 14:00",
      icon: "pi pi-cog",
      color: "#673AB7",
      number: 2
    },
    {
      status: "Shipped",
      date: "15/10/2020 16:15",
      icon: "pi pi-shopping-cart",
      color: "#FF9800",
      number: 3
    },
    {
      status: "Delivered",
      date: "16/10/2020 10:00",
      icon: "pi pi-check",
      color: "#607D8B",
      number: 4
    },
  ];

  const customizedMarker = (item) => {
    return (
      <span className="custom-marker p-shadow-2">{item.number}</span>
    );
  };

  const customizedContent = (item) => {
    return (
      <MilestoneItem milestone={item} />
    );
  };

  return (
    <div> <Link to='/projects'>Back To List</Link>

      <Card style={{'width': '1200px', 'margin': '30px, auto'}}>
       

      <div className="p-fluid">

          <div className="p-field p-grid">
              <label htmlFor="id" className="p-col-12 p-md-3">ID</label>
              <div className="p-col-6 p-md-9">
                  <InputText id="id" type="text" value={project.id} disabled/>
              </div>
          </div>

          <div className="p-field p-grid">
              <label htmlFor="projectname" className="p-col-12 p-md-3">Project Name</label>
              <div className="p-col-6 p-md-9">
                  <InputText id="firstname4" type="text" value={project.name} disabled/>
              </div>
          </div>

          <div className="p-field p-grid">
              <label htmlFor="description" className="p-col-12 p-md-3">Description</label>
              <div className="p-col-12 p-md-9 ">
                  <InputTextarea id="description" value={project.description} disabled/>
              </div>
          </div>

          <div className="p-field p-grid">
              <label htmlFor="dateEnd" className="p-col-12 p-md-2">Date End</label>
              <div className="p-col-12 p-md-4 ">
                  <Calendar id="dateEnd" value={project.dateEnd} disabled/>
              </div>

              <label htmlFor="estimateDateEnd" className="p-col-4 p-md-2">Estimate Date End</label>
              <div className="p-col-8 p-md-4">
                  <Calendar id="estimateDateEnd" value={project.estimateDateEnd} disabled/>
              </div>
          </div>


          <div className="p-field p-grid">
              <label htmlFor="estimatePrice" className="p-col-4 p-md-2">Estimate Price</label>
              <div className="p-col-8 p-md-4 ">
                  <InputText id="estimatePrice" type="text" value={project.estimatePrice} disabled/>
              </div>

              <label htmlFor="actualPrice" className="p-col-4 p-md-2">Actual Price</label>
              <div className="p-col-8 p-md-4 ">
                  <InputText id="actualPrice" type="text" value={project.actualPrice} disabled/>
              </div>
          </div>

          </div>

      </Card>

      <Timeline
        value={milestones}
        align="alternate"
        className="x-timeline"
        marker={customizedMarker}
        content={customizedContent}
      />
    </div>
  );
};

export default ProjectDetails;
