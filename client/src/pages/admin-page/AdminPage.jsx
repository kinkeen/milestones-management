import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ProjectList from '../../components/project-list/ProjectList';
import MilestoneDetails from '../../components/milestone-details/MilestoneDetails'

import './AdminPage.scss'


const AdminPage = ({ logout }) => {

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