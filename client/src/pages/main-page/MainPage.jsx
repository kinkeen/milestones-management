import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


import GuardedRoute from '../../helpers/GuardedRoute'

import LoginPage from '../login-page/LoginPage';
import AdminPage from '../admin-page/AdminPage';

function MainPage() {
  const [isAutheticated, setisAutheticated] = useState(false);

  function login() {
    setisAutheticated(true);
    sessionStorage.setItem('isAutheticated', true)
  }

  function logout() {
    setisAutheticated(false);
    sessionStorage.removeItem('isAutheticated')
  }

  useEffect(() => {
    let isLogged = sessionStorage.getItem('isAutheticated');

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

  return (
    <div>
      <Router>
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul> */}

        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path='/login'>
            {!isAutheticated ? <LoginPage login={login} /> : <Redirect to="/admin" />}
          </Route>
          <Route path='/admin'>
            {isAutheticated ? <AdminPage logout={logout} /> : <Redirect to="/login" />}
          </Route>

          {/* <GuardedRoute exact path='/projects' component={AdminPage} auth={isAutheticated} />
          <GuardedRoute exact path='/projects/:id' component={AdminPage} auth={isAutheticated} />

          <GuardedRoute path='/milestone/:id' component={AdminPage} auth={isAutheticated} /> */}

          {/* <GuardedRoute path='/admin' component={AdminPage} auth={isAutheticated} /> */}
        </Switch>

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
