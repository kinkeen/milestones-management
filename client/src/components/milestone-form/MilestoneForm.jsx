import React, { useState, useEffect, useRef } from 'react';

import SignaturePad from 'react-signature-canvas'

import {
    Button, 
    Fieldset, 
    InputText, 
    InputTextarea, 
    Calendar
} from '../../helpers/ui.modue';

import moment from 'moment'

// import './MilestoneForm.scss'
// import ProjectService from "../../services/MilestonService";


// const [submitted, setSubmitted] = useState(false);
// const [mileston, setMileston] = useState(props.mileston || {});

// const service = new MilestonService();

// useEffect(() => {
    

// }, [mileston])

// const doClose = () => {
//     if (props.closeHandler instanceof Function) {
//         props.closeHandler()
//     }
// }

// const doSave = () => {
//     const id = mileston.id;
//     if (id) {
//         service.put(id, mileston).then(data => {
//             props.closeHandler()
//         });
//     }
//     else {
//         service.post(mileston).then(data => {
//             props.closeHandler()
//         });
//     }
// }


// const onInputChange = (e, name) => {

//     const val = (e.target && e.target.value) || '';

//     let _project = { ...mileston };
//     _project[name] = val;

//     console.log()

//     setMileston(_project);
// }

// const onDateChange = (val, name) => {
//     let _project = { ...mileston };
//     _project[name] = val;
//     setMileston(_project);
// }


// const string2Date = (date) => {
//     console.log(date, moment.utc(date).toDate())
//     return moment.utc(date).toDate();
// }


const MilestoneForm = () => {
    const sigPad = useRef();

    const clear = () => {
        sigPad.current.clear();
    }


    const save = () => {

        // sigPad.current.toBlob((blob) => {
        //     console.log(blob)
        //     // const reader = new FileReader();
        //     // reader.addEventListener('loadend', () => {
        //     //   const arrayBuffer = reader.result;
        //     //   bufferByteLen.textContent = arrayBuffer.byteLength + ' bytes.';

        //     //   // Dispay Blob content in an Image.
        //     //   const blob = new Blob([arrayBuffer], {type: mimeType});
        //     //   imageOut.src = URL.createObjectURL(blob);
        //     // });
        //     // reader.readAsArrayBuffer(blob);
        // }, 'image/png');

        console.log(sigPad.current.toDataURL('image/jpeg', 1))
        //         .toDataURL('image/png')
        // })
    }



    // trim = () => {
    //     this.setState({
    //         trimmedDataURL: this.sigPad.getTrimmedCanvas()
    //             .toDataURL('image/png')
    //     })
    // }

    return (

        <React.Fragment>


{/* this.id = uuidv4();
		this.assets = [];
		this.digitalSignatures = []; */}


        <Fieldset legend="Milestone" >

            {/* <div className="p-fluid">
                <div className="p-field p-grid">
                    <label htmlFor="id" className="p-col-12 p-md-3">ID</label>
                    <div className="p-col-6 p-md-9">
                        <InputText id="id" type="text" value={mileston.id} disabled />
                    </div>
                </div>

                <div className="p-field p-grid">
                    <label htmlFor="projectname" className="p-col-12 p-md-3">Project Name</label>
                    <div className="p-col-6 p-md-9">
                        <InputText id="firstname4" type="text" value={mileston.projectId} onChange={(e) => onInputChange(e, 'name')} required />
                    </div>
                </div>

                <div className="p-field p-grid">
                    <label htmlFor="description" className="p-col-12 p-md-3">Description</label>
                    <div className="p-col-12 p-md-9 ">
                        <InputTextarea id="description" value={mileston.description} onChange={(e) => onInputChange(e, 'description')} required type="text" required rows={5} />
                    </div>
                </div>

                <div className="p-field p-grid">
                    <label htmlFor="dateEnd" className="p-col-12 p-md-3">Date Start</label>
                    <div className="p-col-12 p-md-9 ">
                        <Calendar id="dateEnd" value={string2Date(mileston.dateStart)} onChange={(e) => onDateChange(e.value, 'dateEnd')} mask="99/99/9999" />
                    </div>
                </div>


                <div className="p-field p-grid">
                    <label htmlFor="dateEnd" className="p-col-12 p-md-3">Date End</label>
                    <div className="p-col-12 p-md-9 ">
                        <Calendar id="dateEnd" value={string2Date(mileston.dateEnd)} onChange={(e) => onDateChange(e.value, 'dateEnd')} mask="99/99/9999" />
                    </div>
                </div>

                <div className="p-field p-grid">
                    <label htmlFor="estimateDateEnd" className="p-col-4 p-md-3">Estimate Date End</label>
                    <div className="p-col-8 p-md-9 ">
                        <Calendar id="estimateDateEnd" value={string2Date(mileston.estimateDateEnd)} onChange={(e) => onDateChange(e.value, 'estimateDateEnd')} mask="99/99/9999" />
                    </div>
                </div>

                <div className="p-field p-grid">
                    <label htmlFor="estimatePrice" className="p-col-4 p-md-3">Estimate Price</label>
                    <div className="p-col-8 p-md-9 ">
                        <InputText id="estimatePrice" type="text" value={mileston.estimatePrice} onChange={(e) => onInputChange(e, 'estimatePrice')} />
                    </div>
                </div>

                <div className="p-field p-grid">
                    <label htmlFor="actualPrice" className="p-col-4 p-md-3">Actual Price</label>
                    <div className="p-col-8 p-md-9 ">
                        <InputText id="actualPrice" type="text" value={mileston.actualPrice} onChange={(e) => onInputChange(e, 'actualPrice')} />

                    </div>
                </div>
            </div> */}
            <footer>
                <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                <Button label="Clear" className="p-button-raised p-button-text" onClick={clear}></Button>
            </footer>
        </Fieldset>

            {/* <SignatureCanvas penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} /> */}

            <SignaturePad
                ref={sigPad}
            />

            {/* 
   
        <SignaturePad canvasProps={{className: styles.sigPad}}
          ref={(ref) => { this.sigPad = ref }} />
      
        <button className={styles.buttons} onClick={this.clear}>
          Clear
        </button>
        <button className={styles.buttons} onClick={this.trim}>
          Trim
        </button> */}



        </React.Fragment>
    )
}

export default MilestoneForm;