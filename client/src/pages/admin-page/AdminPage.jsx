import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";

import { Toolbar } from 'primereact/toolbar';
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';

import ProjectList from '../../components/project-list/ProjectList';
import ProjectDetails from '../../components/project-details/ProjectDetails';
import MilestoneDetails from '../../components/milestone-details/MilestoneDetails'

import './AdminPage.scss'


const AdminPage = ({ logout }) => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRigth, setVisibleRigth] = useState(false);

  let { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/projects`}>
          <ProjectList />
        </Route>
        <Route path='/milestone/:id'>
          <MilestoneDetails />
        </Route>

      </Switch>
    </div>
  );
};

export default AdminPage;