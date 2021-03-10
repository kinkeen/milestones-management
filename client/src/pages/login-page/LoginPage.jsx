import React from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Panel } from 'primereact/panel';

const LoginPage = ({ login }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    login()
  }

  return (
    <div className="p-grid">
      <div className="p-col">
      </div>
      <div className="p-col">
        <Panel header="Login">
          <form onSubmit={handleSubmit}>

            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="username" className="p-sr-only">
                  Username
              </label>
                <InputText id="username" type="text" placeholder="Username" required />
              </div>
              <div className="p-field">
                <label htmlFor="password" className="p-sr-only">
                  Password
              </label>
                <InputText id="password" type="password" placeholder="Password" required />
              </div>
              <Button label="Login" type="submit"></Button>
            </div>

          </form>
        </Panel>
      </div>
      <div className="p-col">
      </div>
    </div>
  );
};

export default LoginPage;
