import React, { useState, useEffect } from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";


import './ProjectDetails.scss';

import ProjectService from "../../services/ProjectService";

const ProjectDetails = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);

  const service = new ProjectService();

  useEffect(() => {
    service.retrive().then((data) => {
      setProjects(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const events1 = [
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
        {item.image && (
          <img
            /*src={`showcase/demo/images/product/${item.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={item.name}
            width={200}
            className="p-shadow-2"*/
          />
        )}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
        <Button label="Read more" className="p-button-text"></Button>
      </Card>
    );
  };

  return (
    <div>
      <Card>
       Project name <br />
       Due ate
      </Card>

      <Timeline
        value={events1}
        align="alternate"
        className="customized-timeline"
        marker={customizedMarker}
        content={customizedContent}
      />
    </div>
  );
};

export default ProjectDetails;
