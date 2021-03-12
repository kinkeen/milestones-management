import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import moment from 'moment'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';

import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

import './ProjectList.scss';

import ProjectService from "../../services/ProjectService";
import ProjectForm from '../project-form/ProjectForm'

import conf from '../../helpers/Configuration';


const ProjectList = () => {
  let emptyProject = {
    id: null,
    ownerId: null,
    name: '',
    description: '',
    dateStart: null,
    dateEnd: null,
    estimateDateEnd: 0,
    estimatePrice: 0,
    actualPrice: 0,
    milestones: [],
    users: []
  };

  const [projects, setProjects] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [projectDialog, setProjectDialog] = useState(false);

  const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
  const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);

  const [project, setProject] = useState(emptyProject);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const toast = useRef(null);
  const dt = useRef(null);

  const service = new ProjectService();

  useEffect(() => {
    service.retrive().then((data) => {
      setProjects(data);
    });
  }, []);

  const confirm = () => {
    confirmDialog({
      message: 'Are you sure you want to delete the selected projects?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptFunc(),
      reject: () => rejectFunc()
    });
  }

  const acceptFunc = () => {
    const ids = selectedProjects.map(item => item.id);
    let _projects = projects.filter(val => !selectedProjects.includes(val));
    setProjects(_projects);
    setSelectedProjects(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
    //this.service.delete(ids)
    console.log('acceptFunc', _projects)
  }

  const rejectFunc = () => {
    console.log('rejectFunc')
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('en-CA', { style: 'currency', currency: 'CND' });
  }

  const openNew = () => {
    setProject(emptyProject);
    setSubmitted(false);
    // setProjectDialog(true);

    setVisibleRight(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setProjectDialog(false);
  }

  const hideDeleteProjectDialog = () => {
    //setDeleteProjectDialog(false);
  }

  const hideDeleteProjectsDialog = () => {
    //setDeleteProjectsDialog(false);
  }

  const saveProject = () => {

    setSubmitted(true);

    if (project.name.trim()) {
      let _projects = [...projects];
      let _project = { ...project };
      if (project.id) {
        const index = findIndexById(project.id);

        _projects[index] = _project;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'project Updated', life: 3000 });
      }
      else {
        _project.id = createId();
        _project.image = 'project-placeholder.svg';
        _projects.push(_project);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Project Created', life: 3000 });
      }

      setProjects(_projects);
      setProjectDialog(false);
      setProject(emptyProject);
    }
  }

  /*  const editProject = (project) => {
      setProject({ ...project });
      setProjectDialog(true);
    }*/

  const deleteProject = () => {
    let _projects = projects.filter(val => val.id !== project.id);
    setProject(_projects);
    //setDeleteProjectDialog(false);
    setProject(emptyProject);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  const deleteSelectedProjects = () => {
    let _projects = projects.filter(val => !selectedProjects.includes(val));
    setProjects(_projects);
    //setDeleteProjectsDialog(false);
    setSelectedProjects(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
         <Button label="New" icon="pi pi-plus" className="p-button-raised p-button-rounded" onClick={openNew} />
        {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirm} disabled={!selectedProjects || !selectedProjects.length} /> */}
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
    //return <span className={`project-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    return rowData.description;
  }

  const estimatePriceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.estimatePrice);
  }

  const actualPricePriceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.actualPrice);
  }

  const milestoneseBodyTemplate = (rowData) => {
    return formatCurrency(rowData.milestones); // milestones: []
  }

  /*const usersBodyTemplate = (rowData) => {
    return formatCurrency(rowData.users); /// users: []
  }*/


  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Projects</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

  const projectDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProject} />
    </React.Fragment>
  );

  const deleteProjectDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProjectDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProject} />
    </React.Fragment>
  );

  const deleteProjectsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProjectsDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProjects} />
    </React.Fragment>
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
      accept,
      reject
  }) ;


  /*  service.post(project)
    if (saveHandler instanceof Function) {
        saveHandler(project)
    }
    else {
        // PUT HERE SAVE PROJECT 
    }*/

    if (accept){
      let _projects = projects.filter(val => val.id !== project.id);
      setProject(_projects);
      //setProject(rowData)
      service.post('/delete:id', _projects);  
    }

    if (reject){
      
      
    }

  }


  const accept = () => {
    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });

     setProject(emptyProject);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });

  };

  const reject = () => {
    toast.current.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };



  const actionBodyTemplate = (rowData) => {
    return (
      <span className="actions-column">

        <Button type="button" icon="pi pi-trash" className=" p-button-outlined p-button-secondary" onClick={doDelete}></Button>
        
        <Button type="button" icon="pi pi-pencil" className=" p-button-outlined p-button-secondary" onClick={() => {
          doEdit(rowData);
        }}></Button>

        <Link to={`/projects/${rowData.id}`} >
          <Button type="button" icon="pi pi-external-link" className=" p-button-outlined p-button-secondary"></Button>
        </Link>
      </span>
    );
  }

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable ref={dt} value={projects} selection={selectedProjects} onSelectionChange={(e) => setSelectedProjects(e.value)}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
          globalFilter={globalFilter}
          header={header}>
          {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
          {/* <Column field="id" header="id" d></Column>
          <Column field="ownerId" header="ownerId" body={ownerIdBodyTemplate} sortable></Column> */}
          {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
          <Column field="name" header="Name" body={nameBodyTemplate} sortable></Column>
          <Column field="description" header="Description" body={descriptionBodyTemplate} sortable></Column>
          <Column field="dateStart" header="Date Start" body={dateStartBodyTemplate} sortable></Column>
          <Column field="dateEnd" header="Date End" body={dateEndBodyTemplate} sortable></Column>
          <Column field="estimatePrice" header="Estimate Price" body={estimatePriceBodyTemplate} sortable></Column>
          <Column field="actualPrice" header="Actual Price" body={actualPricePriceBodyTemplate} sortable></Column>

          <Column body={actionBodyTemplate} headerStyle={{ width: '10em', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
        </DataTable>
      </div>



      <Sidebar visible={visibleRight} position="right" showCloseIcon={false} style={{ 'width': '50vw' }} baseZIndex={1000000} onHide={() => setVisibleRight(false)}>
        <ProjectForm project={project} closeHandler={setVisibleRight} />
      </Sidebar>

      <Dialog visible={projectDialog} style={{ width: '450px' }} header="Project Details" modal className="p-fluid" footer={projectDialogFooter} onHide={hideDialog}>
        <ProjectForm project={project} />
      </Dialog>


      <Dialog visible={deleteProjectDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProjectDialogFooter} onHide={hideDeleteProjectDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {project && <span>Are you sure you want to delete <b>{project.name}</b>?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteProjectsDialog} style={{ width: '450px' }} header="Confirm" modal
        footer={deleteProjectsDialogFooter}
        onHide={hideDeleteProjectsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {project && <span>Are you sure you want to delete the selected projects?</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectList;
