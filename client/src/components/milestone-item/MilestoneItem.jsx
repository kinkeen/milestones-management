import React, { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { Link } from "primereact/button";

import "./MilestoneItem.scss";

const MilestoneItem = ({ milestone, editHandler }) => {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {}, [collapsed]);

  const onEdit = () => {
    editHandler(milestone);
  };

  const subtitle = () =>
    collapsed ? (
      <div className="x-toolbar">
        <span>{milestone.date}</span>
        <span>
          <i
            className="pi pi-chevron-down"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          ></i>
          <i className="pi pi-external-link"></i>
          <i className="pi pi-pencil" onClick={onEdit}></i>
        </span>
      </div>
    ) : (
      <div className="x-toolbar">
        <span>{milestone.date}</span>
        <span>
          <i
            className="pi pi-chevron-up"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          ></i>
          <i className="pi pi-link"></i>
        </span>
      </div>
    );
  return (
    <Card 
      title={milestone.name}
      subTitle={milestone.date}
      className={`${collapsed ? "x-collapsed" : "x-expanded"}`}
    >
      <div className="x-content">
      {milestone.description}
      
      {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed
        consequuntur error repudiandae numquam deserunt quisquam repellat libero
        asperiores earum nam nobis, culpa ratione quam perferendis esse,
        cupiditate neque quas! */}
      </div>
      <div className="x-toolbar">
        <span>
        {
        collapsed ? 
        <i
            className="pi pi-chevron-down"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          ></i>
        : 
        <i
            className="pi pi-chevron-up"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          ></i>
        }
          <i className="pi pi-external-link"></i>
          <i className="pi pi-pencil" onClick={onEdit}></i>
        </span>
      </div>
    </Card>
  );
};

export default MilestoneItem;

// return (
//     <Card title={milestone.status} subTitle={milestone.date}>
//     {milestone.image && (
//       <img
//         src={`showcase/demo/images/product/${milestone.image}`}
//         onError={(e) =>
//           (e.target.src =
//             "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
//         }
//         alt={milestone.name}
//         width={200}
//         className="p-shadow-2"
//       />
//     )}
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
//       sed consequuntur error repudiandae numquam deserunt quisquam repellat
//       libero asperiores earum nam nobis, culpa ratione quam perferendis
//       esse, cupiditate neque quas!
//     </p>
//     <Button label="Read more" className="p-button-text"></Button>
//   </Card>
// );
