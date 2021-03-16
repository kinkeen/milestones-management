import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { Toolbar } from 'primereact/toolbar';
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';

import ProjectList from '../../components/project-list/ProjectList';
import ProjectDetails from '../../components/project-details/ProjectDetails';
import MilestoneDetails from '../../components/milestone-details/MilestoneDetails'


import './AdminPage.scss'
import UserDetails from "../../components/user-details/UserDetails";

const AdminPage = ({ logout }) => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const menu = useRef(null);
  const userMenu = [
    {
      label: 'Options',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: () => {

          }
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            logout()
          }
        }
      ]
    }
  ];

  const leftContents = (
    <React.Fragment>
      <i className="pi pi-bars p-toolbar-separator p-mr-2" onClick={() => setVisibleLeft(true)} role="link" />
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <Menu model={userMenu} popup ref={menu} id="popup_menu" />
      <i className="pi pi-user p-toolbar-separator p-mr-2" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup role="link" />
    </React.Fragment>
  );

  return (
    <div>
      <Toolbar left={leftContents} right={rightContents} />
      <Router>
        <Sidebar visible={visibleLeft} baseZIndex={1000000} onHide={() => setVisibleLeft(false)}>
          <div className="p-tieredmenu p-component">
            <ul role="menubar" aria-orientation="horizontal">
              <li className="p-menuitem" role="none">
                <Link to="/projects">
                  <span className="p-menuitem-icon pi pi-fw pi-file"></span>
                  <span className="p-menuitem-text">
                    Projects
                  </span>
                </Link>
              </li>
              <li className="p-menuitem" role="none">
                <Link to="/users">
                  <span className="p-menuitem-icon pi pi-fw pi-user"></span>
                  <span className="p-menuitem-text">Users</span>
                </Link>
              </li>
              <li className="p-menu-separator" role="separator"></li>
              <li className="p-menuitem" role="none"><a href="#" className="p-menuitem-link" role="menuitem" aria-haspopup="false">
                <span className="p-menuitem-icon pi pi-fw pi-power-off"></span>
                <span className="p-menuitem-text">Quit</span>
              </a>
              </li>
            </ul>
          </div>

        </Sidebar>
        <Switch>

          <Route exact path='/projects'>
            <ProjectList />
          </Route>

          <Route path='/projects/:id'>
            <ProjectDetails />
          </Route>

          <Route path='/milestone/:id'>
            <MilestoneDetails />
          </Route>
          <Route path='/users'>
            <UserDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default AdminPage;