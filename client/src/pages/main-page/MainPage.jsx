import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProjectForm from '../../components/project-form/ProjectForm'
import ProjectList from '../../components/project-list/ProjectList';
import ProjectDetails from '../../components/project-details/ProjectDetails'


const MainPage = () => {
  return (
    <div className="main-page">
      <Router>

        <div className="p-d-flex p-p-3 card">
         
          <Link to="/projects">projects</Link>
        </div>


        <Switch>

          <Route path="/" exact={true}>
            <ProjectList />
          </Route>

          <Route path="/projects" exact={true}>
            <ProjectList />
          </Route>

          <Route path="/projects/:id">
            <ProjectDetails />
          </Route>

          <Route path="/projects/new" exact={true}>
            <ProjectForm />
          </Route>

        </Switch>

      </Router>
    </div>
  );
};

export default MainPage;
