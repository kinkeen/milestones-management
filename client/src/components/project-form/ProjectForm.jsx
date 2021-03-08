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

const ProjectForm = () => {

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
    const [project, setProject] = useState(emptyProject);
    const [submitted, setSubmitted] = useState(false);

    const onCategoryChange = (e) => {
        let _project = { ...project };
        _project['category'] = e.value;
        setProject(_project);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _project = { ...project };
        _project[`${name}`] = val;

        setProject(_project);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _project = { ...project };
        _project[`${name}`] = val;

        setProject(_project);
    }


    return (
        <React.Fragment>
            {project.image && <img src={`showcase/demo/images/project/${project.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={project.image} className="project-image" />}
            <div className="p-field">
                <label htmlFor="name">Name</label>
                <InputText id="name" value={project.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !project.name })} />
                {submitted && !project.name && <small className="p-error">Name is required.</small>}
            </div>

            <div className="p-field">
                <label htmlFor="description">Description</label>
                <InputTextarea id="description" value={project.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
            </div>

            <div className="p-field">
                <label className="p-mb-3">Category</label>
                <div className="p-formgrid p-grid">
                    <div className="p-field-radiobutton p-col-6">
                        <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={project.category === 'Accessories'} />
                        <label htmlFor="category1">Accessories</label>
                    </div>
                    <div className="p-field-radiobutton p-col-6">
                        <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={project.category === 'Clothing'} />
                        <label htmlFor="category2">Clothing</label>
                    </div>
                    <div className="p-field-radiobutton p-col-6">
                        <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={project.category === 'Electronics'} />
                        <label htmlFor="category3">Electronics</label>
                    </div>
                    <div className="p-field-radiobutton p-col-6">
                        <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={project.category === 'Fitness'} />
                        <label htmlFor="category4">Fitness</label>
                    </div>
                </div>
            </div>

            <div className="p-formgrid p-grid">
                <div className="p-field p-col">
                    <label htmlFor="price">Price</label>
                    <InputNumber id="price" value={project.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                </div>
                <div className="p-field p-col">
                    <label htmlFor="quantity">Quantity</label>
                    <InputNumber id="quantity" value={project.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProjectForm;