import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from "react-router-dom";
import moment from 'moment'

import {
  Toast, 
  Column, 
  DataTable, 
  Card,
  InputText,
  Button,
  Toolbar,
  Sidebar,
  Fieldset
} from "../../helpers/ui.modue";


import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

import './ProjectList.scss';

import ProjectService from "../../services/ProjectService";
import ProjectForm from '../project-form/ProjectForm';
import ProjectDetails from '../../components/project-details/ProjectDetails';

import conf from '../../helpers/Configuration';


const ProjectList = () => {

  const [projects, setProjects] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [project, setProject] = useState({});
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const toast = useRef(null);
  const dt = useRef(null);
  const service = new ProjectService();


  let { path, url } = useRouteMatch();

  useEffect(() => {
    service.retrive().then((data) => {
      setProjects(data);
    });
  }, []);

  const formatCurrency = (value) => {
    if (value) {
      return value.toLocaleString('en-CA', { style: 'currency', currency: 'CND' });
    }
    return value;
  }

  const openNew = () => {
    setProject({});
    setSubmitted(false);
    setVisibleRight(true);
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
          <Button label="NEW PROJECT" icon="pi pi-plus" className="p-button-raised p-button-text" onClick={openNew}></Button>        
      </React.Fragment>
    )
  }

  const nameBodyTemplate = (rowData) => {
    return rowData.name;
  }

  const dateStartBodyTemplate = (rowData) => {
    return moment(rowData.dateStart).format(conf.dateFormat);
  }

  const dateEndBodyTemplate = (rowData) => {
    return moment(rowData.dateEndBodyTemplate).format(conf.dateFormat);
  }

  const descriptionBodyTemplate = (rowData) => {
    return rowData.description;
  }

  const estimatePriceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.estimatePrice);
  }

  const actualPricePriceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.actualPrice);
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );


  const doEdit = (rowData) => {
    setProject(rowData)
    setVisibleRight(true)
  }

  const doDelete = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',

      accept: () => {

        let el = event.target;

        if (el.tagName == 'SPAN') {
          el = el.parentElement;
        }

        const id = el.getAttribute('datarow');

        service.delete(id).then(() => {
          service.retrive().then((data) => {
            setProjects(data);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
          });
        });

      },
      reject: () => {
        toast.current.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <span className="actions-column">
        <Button type="button" icon="pi pi-trash" className=" p-button-outlined p-button-secondary" datarow={rowData.id} onClick={doDelete}></Button>
        <Link to={`${url}/${rowData.id}`}>
          <Button type="button" icon="pi pi-external-link" className=" p-button-outlined p-button-secondary"></Button>
        </Link>
        <Button type="button" icon="pi pi-pencil" className=" p-button-outlined p-button-secondary" onClick={() => {
          doEdit(rowData);
        }}></Button>

        
      </span>
    );
  }

  const closeHandler = () => {
    setVisibleRight(false);
    service.retrive().then((data) => {
      setProjects(data);
    });
  }

  return (

    <Switch>
      
       <Route path={`${path}/:id`}>
            <ProjectDetails />
        </Route>

       <Route path={path}>


       <Card className="x-project-list">
        
        <Fieldset legend="PROJECT LIST" >
  

          <div className="datatable-crud-demo">
            <Toast ref={toast} />

            {/* <div className="card" > */}

              <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

              <DataTable ref={dt}
                value={projects}
                selection={selectedProjects}
                onSelectionChange={(e) => setSelectedProjects(e.value)}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
                globalFilter={globalFilter}
                header={header}>

                <Column field="name" header="Name" body={nameBodyTemplate} sortable></Column>
                <Column field="description" header="Description" body={descriptionBodyTemplate} sortable></Column>
                <Column field="dateStart" header="Date Start" body={dateStartBodyTemplate} sortable></Column>
                <Column field="dateEnd" header="Date End" body={dateEndBodyTemplate} sortable></Column>
                <Column field="estimatePrice" header="Estimate Price" body={estimatePriceBodyTemplate} sortable></Column>
                <Column field="actualPrice" header="Actual Price" body={actualPricePriceBodyTemplate} sortable></Column>
                <Column
                  body={actionBodyTemplate}
                  headerStyle={{ width: '10em', textAlign: 'center' }}
                  bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                />
              </DataTable>
            {/* </div> */}

            <Sidebar visible={visibleRight} position="right" showCloseIcon={false} style={{ 'width': '50vw' }} baseZIndex={1000000} onHide={() => setVisibleRight(false)}>
              <ProjectForm project={project} closeHandler={closeHandler} />
            </Sidebar>
          </div>

        </Fieldset >
  
        </Card>
  
        </Route>
    </Switch>
    
    );
   
};

export default ProjectList;
