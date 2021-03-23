import React, { useState, useEffect } from "react";
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

import moment from "moment";
import "./ProjectDetails.scss";
import ProjectService from "../../services/ProjectService";
import MilestoneItem from "../milestone-item/MilestoneItem";
import MilestoneForm from "../milestone-form/MilestoneForm";
//import Project from '../../core/models/project.model';
import useSharedProject from '../../contexts/project-context'
import Milestone from '../../core/models/milestone.model';

const ProjectDetails = () => {
  const [visibleRight, setVisibleRight] = useState(false);
  //const [milestone, setMilestone] = useState({});
  //const [project, setProject] = useState(new Project({}));

  const {project, setProject, milestone, setMilestone} = useSharedProject();

  // const [project, setProject] = useState({
  //   id: "",
  //   ownerId: "",
  //   name: "",
  //   description: "",
  //   dateStart: "",
  //   dateEnd: "",
  //   estimateDateEnd: 0,
  //   estimatePrice: 0,
  //   actualPrice: 0,
  //   milestones: [],
  //   users: [],
  // });

  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const service = new ProjectService();

  useEffect(() => {
    service.get(id).then((data) => {
      setProject(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const string2Date = (date) => {
    console.log(date, moment.utc(date).toDate());
    return moment.utc(date).toDate();
  };

  const onNewMilestone = () => {
    setMilestone(new Milestone({
      projectId: project.id,
    }));
    setVisibleRight(true);
  };

  const onEditMilestone = (milestone) => {
    setMilestone(milestone);
    setVisibleRight(true);
  };

  const leftContents = (
    <React.Fragment>
      <Button label="NEW MILESTONE" icon="pi pi-plus" className="p-button-raised p-button-text" onClick={onNewMilestone}></Button>
    </React.Fragment>
  );

  const closeHandler = () => {
    setVisibleRight(false);
    // service.retrive().then((data) => {
    //   setProjects(data);
    // });
  };

  return (
    <React.Fragment>

      <Card className="x-project-details">

        <Fieldset legend="PROJECT DETAILS" >
        
        <div className="p-fluid">
          <div className="p-field p-grid">
            <label htmlFor="id" className="p-col-12 p-md-3">
              ID
            </label>
            <div className="p-col-6 p-md-9">
              <InputText id="id" type="text" value={project.id} disabled />
            </div>
          </div>

          <div className="p-field p-grid">
            <label htmlFor="projectname" className="p-col-12 p-md-3">
              Project Name
            </label>
            <div className="p-col-6 p-md-9">
              <InputText
                id="name"
                type="text"
                value={project.name}
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
                value={project.description}
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
                value={string2Date(project.dateEnd)}
                disabled
              />
            </div>

            <label htmlFor="estimateDateEnd" className="p-col-4 p-md-2">
              Estimate Date End
            </label>
            <div className="p-col-8 p-md-4">
              <Calendar
                id="estimateDateEnd"
                value={string2Date(project.estimateDateEnd)}
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
                value={project.estimatePrice}
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
                value={project.actualPrice}
                disabled
              />
            </div>
          </div>
        </div>

        <Toolbar left={leftContents} />

        <Timeline
          value={project.milestones}
          align="alternate"
          className="x-timeline"
          marker={(item, index) => (
            <span className="custom-marker p-shadow-2">{index + 1}</span>
          )}
          content={(item) => <MilestoneItem milestone={item} editHandler={onEditMilestone} />}
        />
        </Fieldset>  
      </Card>

      <Sidebar
        visible={visibleRight}
        position="right"
        showCloseIcon={false}
        style={{ width: "50vw" }}
        baseZIndex={1000000}
        onHide={() => setVisibleRight(false)}
      >

      <MilestoneForm milestone={milestone}  closeHandler={closeHandler} />

      </Sidebar>
    </React.Fragment>
  );
};

export default ProjectDetails;
