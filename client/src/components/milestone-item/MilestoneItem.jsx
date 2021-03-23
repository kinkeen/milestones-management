import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import moment from 'moment';

import { Card } from "primereact/card";
import StatusType from '../../core/enums/StatusType';
import useSharedProject from '../../contexts/project-context';

import "./MilestoneItem.scss";

const MilestoneItem = ({ milestone, editHandler }) => {
  const [collapsed, setCollapsed] = useState(true);

 // const { project, setProject, milestone, setMilestone } = useSharedProject();

  useEffect(() => { }, [collapsed]);

  let { path, url } = useRouteMatch();

  //#region Methods
  const onEdit = () => {
    editHandler(milestone);
  };

  const getStatusText = (status) => {
    console.log('ITEM STATUS: ', status)

    switch (status) {
      case StatusType.INIT:
        return 'Waiting to accept';

      case StatusType.WAITING_TO_ACCEPT:
        return 'Waiting to accept';

      case StatusType.ASK_MODIFICATION:
        return 'Ask for modification';

      case StatusType.ACCEPTED:
        return 'Accepted';

      case StatusType.STARTED:
        return 'Started';

      case StatusType.IN_PROGRESS:
        return 'In progress';

      case StatusType.FINISHED:
        return 'Finished';

      case StatusType.REJECTED:
        return 'Rejected';

      case StatusType.CONFIRMED:
        return 'Confirm';

      case StatusType.END:
        return 'Complete';

      case StatusType.CANCELLED:
        return 'Cancelled';
    }
  };


  const getNiceDate = (date) => {
    return moment(date).format('MM/DD/YYYY');
  }
  //#endregion Methods

  //#region JSX
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
          <Link to={`${url}/${milestone.id}`}>
            <i className="pi pi-external-link"></i>
          </Link>
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
            <Link to={`${url}/${milestone.id}`}>
              <i className="pi pi-external-link"></i>
            </Link>
          </span>
        </div>
      );
  return (
    <Card
      title={milestone.name}
      subTitle={`Due date: ${getNiceDate(milestone.dateStart)}`}
      className={`${collapsed ? "x-collapsed" : "x-expanded"}`}
    >
      <div className="x-content">
        <b>Description:</b> {milestone.description} <br />
        <b>Status:</b> {milestone.status}<br />
        <b>Finsh Date:</b> {getNiceDate(milestone.estimateDateEnd)}<br />
        <b>Cost:</b> {milestone.estimatePrice}<br />
        {/* 
        getStatusText(milestone.status) */}
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
           <Link to={`/milestone/${milestone.id}`}>
            <i className="pi pi-external-link"></i>
          </Link>
          <i className="pi pi-pencil" onClick={onEdit}></i>
        </span>
      </div>
    </Card>
  );
  //#endregion JSX
};

export default MilestoneItem;