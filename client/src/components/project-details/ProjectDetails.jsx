import React, { useState, useEffect } from "react";
import {
  useParams
} from "react-router-dom";

import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { InputText } from 'primereact/inputtext';


import './ProjectDetails.scss';

import ProjectService from "../../services/ProjectService";

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
      <Card title={item.status} subTitle={item.date}>

      </Card>
    );
  };

  return (
    <div>
      <Card>
        <h3><b>ID:</b>{id}</h3>
        <b>Project name:  </b>{project.name} <br />
        <b>actualPrice:  </b> {project.actualPrice} <br />
        <b>dateEnd:  </b>{project.dateEnd} <br />
        <b>description:  </b>{project.description} <br />
        <b>estimateDateEnd:  </b>{project.estimateDateEnd} <br />
        <b>estimatePrice:  </b>{project.estimatePrice} <br />

        {/*<InputText keyfilter="int" placeholder=""/>
        <InputText placeholder="Project name" {...project.name}/>
        <InputText placeholder="description" {...project.description}/>
        <InputText placeholder="estimatePrice"  {...project.estimatePrice} />
        <InputText placeholder="actualPrice"  {...project.actualPrice} />
        <InputText placeholder="estimateDateEnd"  {...project.estimateDateEnd} />
  <InputText placeholder="dateEnd"  {...project.dateEnd}/>*/}

      </Card>

      <Timeline
        value={milestones}
        align="alternate"
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}
      />
    </div>
  );
};

export default ProjectDetails;
