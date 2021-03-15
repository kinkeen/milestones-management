import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Toolbar } from 'primereact/toolbar';
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';
import { Fieldset } from 'primereact/fieldset';


import GuardedRoute from '../../helpers/GuardedRoute'
import LoginPage from '../login-page/LoginPage';
import AdminPage from '../admin-page/AdminPage';
import ProjectList from '../../components/project-list/ProjectList';
import ProjectDetails from '../../components/project-details/ProjectDetails';
import ProjectForm from '../../components/project-form/ProjectForm';
import MilestoneDetails from '../../components/milestone-details/MilestoneDetails'


function MainPage() {

  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRigth, setVisibleRigth] = useState(false);

  const [isAutheticated, setisAutheticated] = useState(false);

  function login() {
    setisAutheticated(true);
    sessionStorage.setItem('isAutheticated', true)
  }

  function logout() {
    setisAutheticated(false);
    //sessionStorage.setItem('isAutheticated', false)
    sessionStorage.removeItem('isAutheticated')
  }

  useEffect(() => {
    let isLogged = sessionStorage.getItem('isAutheticated');

    console.log(isLogged);

    if (isLogged) {
      setisAutheticated(true);
    }

    if (isAutheticated) {
      // REDIRECT TO ADMIN
    }
    else {
      // REDIRECT TO LOGIN
    }
  }, [isAutheticated])

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
      <Router>
        {isAutheticated && 
          <div>
            <Toolbar left={leftContents} right={rightContents} />
            <Sidebar visible={visibleLeft} baseZIndex={1000000} onHide={() => setVisibleLeft(false)} showCloseIcon={false}>
              <div className="p-tieredmenu p-component">
                <Fieldset legend="Project" >
                  <div>
                    <Link to='/projects'>
                      <span className="p-menuitem-icon pi pi-fw pi-file"></span>
                      <span className="p-menuitem-text" onClick={() => setVisibleLeft(false)}>Projects </span>
                    </Link>
                  </div>  
                  <div>
                    <Link to='/projects/new'>
                      <span className="p-menuitem-icon pi pi-fw pi-file"></span>
                      <span className="p-menuitem-text" onClick={() => setVisibleLeft(false)} >New Project</span>
                    </Link>
                  </div>                    
                </Fieldset>

                <Fieldset legend="user" >
                  <div>                  
                    <Link to="/users">
                      <span className="p-menuitem-icon pi pi-fw pi-user"></span>
                      <span className="p-menuitem-text" onClick={() => setVisibleLeft(false)}>Users</span>
                    </Link>
                  </div>                    
                  <div>                 
                    <Link to="/users/new">
                      <span className="p-menuitem-icon pi pi-fw pi-user"></span>
                      <span className="p-menuitem-text" onClick={() => setVisibleLeft(false)}>New Users</span>
                    </Link>
                  </div>                    
                </Fieldset>
              </div>
            </Sidebar>
         </div>
        }

        <div>
          {!isAutheticated ? <Redirect to="/login" /> : null}

          <Switch>
            <Route exact path="/">
              {isAutheticated ? <AdminPage logout={logout} /> : <Redirect to="/login" />}
            </Route>
            <Route exact path='/login'>
              {!isAutheticated ? <LoginPage login={login} /> : <Redirect to="/" />}
            </Route>
            <Route path='/projects/new'>
              <div  >
                <ProjectForm />
              </div>
            </Route>
            <Route path='/projects'><ProjectList /></Route>

            <Route path='/milestone/:id'><MilestoneDetails /></Route>

            {/* <GuardedRoute exact path='/projects' component={AdminPage} auth={isAutheticated} />
          <GuardedRoute exact path='/projects/:id' component={AdminPage} auth={isAutheticated} />

          <GuardedRoute path='/milestone/:id' component={AdminPage} auth={isAutheticated} /> */}

            {/* <GuardedRoute path='/admin' component={AdminPage} auth={isAutheticated} /> */}

          </Switch>
        </div>

      </Router>
    </div>
  );
}


export default MainPage;
































// import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import ProjectForm from '../../components/project-form/ProjectForm'
// import ProjectList from '../../components/project-list/ProjectList';
// import ProjectDetails from '../../components/project-details/ProjectDetails'


// const MainPage = () => {
//   return (
//     <div className="main-page">
//       <Router>
//         <div className="p-d-flex p-p-3 card">
//           <Link to="/projects">projects</Link>
//         </div>
//         <Switch>
//             <Route path="/" exact={true}>
//               <ProjectList />
//             </Route>
//             <Route path="/projects" exact={true}>
//               <ProjectList />
//             </Route>
//             <Route path="/projects/:id">
//               <ProjectDetails />
//             </Route>
//             <Route path="/projects/new" exact={true}>
//               <ProjectForm />
//             </Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// };

// export default MainPage;
