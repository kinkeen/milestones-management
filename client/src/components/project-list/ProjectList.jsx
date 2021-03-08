import React, { useState, useEffect, useRef } from 'react';

import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import './ProjectList.scss';

import ProjectService from "../../services/ProjectService";
import ProjectForm from '../project-form/ProjectForm'


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
  const [projectDialog, setProjectDialog] = useState(false);
  const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
  const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);
  const [project, setProject] = useState(emptyProject);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);



  // const ProjectService = new ProjectService();
  // useEffect(() => {
  //   ProjectService.getProducts().then(data => setProducts(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const service = new ProjectService();

  useEffect(() => {
    service.retrive().then((data) => {
      console.log(data)
      setProjects(data);
    });
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const openNew = () => {
    setProject(emptyProject);
    setSubmitted(false);
    setProjectDialog(true);
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

  const editProject = (project) => {
    setProject({ ...project });
    setProjectDialog(true);
  }

  const confirmDeleteProject = (project) => {
    setProject(project);
    //setDeleteProjectDialog(true);
  }

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

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    //setDeleteProjectsDialog(true);
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
        <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProjects || !selectedProjects.length} />
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
      </React.Fragment>
    )
  }

  const imageBodyTemplate = (rowData) => {
    return <img src={`showcase/demo/images/project/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="project-image" />
  }

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  }

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  }

  const statusBodyTemplate = (rowData) => {
    return <span className={`project-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProject(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProject(rowData)} />
      </React.Fragment>
    );
  }

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

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        <DataTable ref={dt} value={projects} selection={selectedProjects} onSelectionChange={(e) => setSelectedProjects(e.value)}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
          globalFilter={globalFilter}
          header={header}>

          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column field="id" header="id" sortable></Column>
          <Column field="ownerId" header="ownerId" sortable></Column>
          {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
          <Column field="name" header="name" body={priceBodyTemplate} sortable></Column>
          <Column field="description" header="description" sortable></Column>
          <Column field="dateStart" header="dateStart" body={ratingBodyTemplate} sortable></Column>
          <Column field="dateEnd" header="dateEnd" body={statusBodyTemplate} sortable></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog visible={projectDialog} style={{ width: '450px' }} header="Project Details" modal className="p-fluid" footer={projectDialogFooter} onHide={hideDialog}>
        <ProjectForm project={project} />       
      </Dialog>

      <Dialog visible={deleteProjectDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProjectDialogFooter} onHide={hideDeleteProjectDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {project && <span>Are you sure you want to delete <b>{project.name}</b>?</span>}
        </div>
      </Dialog>

      <Dialog visible={deleteProjectsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProjectsDialogFooter} onHide={hideDeleteProjectsDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          {project && <span>Are you sure you want to delete the selected projects?</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectList;

// const [projects, setProjects] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const service = new ProjectService();

//   useEffect(() => {
//     service.getProducts().then((data) => {
//       setProjects(data);
//     });
//   }, []);

//   return (
//     <div>

// <Link to="/projects/new">projects</Link>
//       <Card>
//         <DataTable value={projects} paginator  rows={10} className="p-datatable-striped">
//           <Column field="code" header="Code"></Column>
//           <Column field="name" header="Name"></Column>
//           <Column field="category" header="Category"></Column>
//           <Column field="quantity" header="Quantity"></Column>
//         </DataTable>
//       </Card>
//     </div>
//   );