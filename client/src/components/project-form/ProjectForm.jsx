import React, { useState, useEffect, useRef } from 'react';

import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import moment from 'moment'
import 'primeflex/primeflex.css';

import './ProjectForm.scss'
import ProjectService from "../../services/ProjectService";

const ProjectForm = (props) => {
    const [submitted, setSubmitted] = useState(false);
    const [project, setProject] = useState(props.project);

    const service = new ProjectService();

    useEffect(() => {
        console.log('PROJECT: ', project)

    }, [project])

    const doClose = () => {
        if (props.closeHandler instanceof Function) {
            props.closeHandler()
        }
    }

    const doSave = () => {
        const id = project.id;
        if (id) {
            service.put(id, project).then(data => {
                props.closeHandler()
            });
        }
        else {
            service.post(project).then(data => {
                props.closeHandler()
            });
        }
    }


    const onInputChange = (e, name) => {

        const val = (e.target && e.target.value) || '';

        let _project = { ...project };
        _project[name] = val;

        console.log()

        setProject(_project);
    }

    const onDateChange = (val, name) => {

        // debugger
        //change textInput
        // const val = (e.target && e.target.value) || '';
        //change numberInput
        //const val = e.value || 0;

        let _project = { ...project };
        _project[name] = val;


        setProject(_project);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _project = { ...project };
        _project[`${name}`] = val;

        setProject(_project);
    }

    const string2Date = (date) => {
        console.log(date, moment.utc(date).toDate())
        return moment.utc(date).toDate();
    }

    return (
        <React.Fragment>
            <main>
                <h3><b>Project:</b></h3>
                <div className="p-fluid">
                    <div className="p-field p-grid">
                        <label htmlFor="id" className="p-col-12 p-md-3">ID</label>
                        <div className="p-col-6 p-md-9">
                            <InputText id="id" type="text" value={project.id} disabled />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="projectname" className="p-col-12 p-md-3">Project Name</label>
                        <div className="p-col-6 p-md-9">
                            <InputText id="firstname4" type="text" value={project.name} onChange={(e) => onInputChange(e, 'name')} required />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="description" className="p-col-12 p-md-3">Description</label>
                        <div className="p-col-12 p-md-9 ">
                            <InputTextarea id="description" value={project.description} onChange={(e) => onInputChange(e, 'description')} required type="text" required rows={5} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="dateEnd" className="p-col-12 p-md-3">Date End</label>
                        <div className="p-col-12 p-md-9 ">
                            <Calendar id="dateEnd" value={string2Date(project.dateEnd)} onChange={(e) => onDateChange(e.value, 'dateEnd')} mask="99/99/9999" />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="estimateDateEnd" className="p-col-4 p-md-3">Estimate Date End</label>
                        <div className="p-col-8 p-md-9 ">
                            <Calendar id="estimateDateEnd" value={string2Date(project.estimateDateEnd)} onChange={(e) => onDateChange(e.value, 'estimateDateEnd')} mask="99/99/9999" />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="estimatePrice" className="p-col-4 p-md-3">Estimate Price</label>
                        <div className="p-col-8 p-md-9 ">
                            <InputText id="estimatePrice" type="text" value={project.estimatePrice} onChange={(e) => onInputChange(e, 'estimatePrice')} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="actualPrice" className="p-col-4 p-md-3">Actual Price</label>
                        <div className="p-col-8 p-md-9 ">
                            <InputText id="actualPrice" type="text" value={project.actualPrice} onChange={(e) => onInputChange(e, 'actualPrice')} />

                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Button label="Save" className="p-button-rounded" onClick={doSave}></Button>
                <Button label="Cancel" className="p-button-rounded p-button-secondary" onClick={() => {
                    doClose()
                }}></Button>
            </footer>
        </React.Fragment>
    )
}

export default ProjectForm;