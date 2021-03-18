import React, { useState, useEffect, useRef } from 'react';

import SignaturePad from 'react-signature-canvas'

import {
    Button,
    Fieldset,
    InputText,
    InputTextarea,
    Calendar,
    FileUpload,
    Dialog
} from '../../helpers/ui.modue';

import moment from 'moment'
import StatusType from '../../core/enums/StatusType'

import './MilestoneForm.scss'
import Milestone from '../../core/models/milestone.model';

const MilestoneForm = (props) => {
    const [mileston, setMileston] = useState(new Milestone(props.milestone));
    const [displayReason, setDisplayReason] = useState(false);
    const [displaySignature, setDisplaySignature] = useState(false);

    const [reason, setReason] = useState('');
    const [status, setStatus] = useState(null)
    const signatureRef = useRef();

    useEffect(() => {
        console.log(mileston)
    }, [])

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';

        let _mileston = { ...mileston };

        _mileston[name] = val;

        setMileston(_mileston);
    }

    const onDateChange = (val, name) => {
        let _mileston = { ...mileston };
        _mileston[name] = val;
        setMileston(_mileston);
    }


    const string2Date = (date) => {
        return moment.utc(date).toDate();
    }


    const clear = () => {
        signatureRef.current.clear();
    }


    const save = () => {

        signatureRef.current.toBlob((blob) => {
            console.log(blob)
            // const reader = new FileReader();
            // reader.addEventListener('loadend', () => {
            //   const arrayBuffer = reader.result;
            //   bufferByteLen.textContent = arrayBuffer.byteLength + ' bytes.';

            //   // Dispay Blob content in an Image.
            //   const blob = new Blob([arrayBuffer], {type: mimeType});
            //   imageOut.src = URL.createObjectURL(blob);
            // });
            // reader.readAsArrayBuffer(blob);
        }, 'image/png');

        console.log(signatureRef.current.toDataURL('image/jpeg', 1))
        //         .toDataURL('image/png')
        // })
    }



    // trim = () => {
    //     this.setState({
    //         trimmedDataURL: this.signatureRef.getTrimmedCanvas()
    //             .toDataURL('image/png')
    //     })
    // }

    const init = () => {
        // SHOW SIGNATURE PAD
    }

    const reject = () => {
        setDisplayReason(true)
    }

    const accept = () => {
        setDisplaySignature(true)
    }


    const onBasicUploadAuto = () => {

    }

    const renderStatusButtons = (status) => {
        switch (status) {
            case StatusType.INIT:
                return (
                    <React.Fragment>
                        <Button label="SAVE" className="p-button-raised p-button-text" onClick={init}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )
            case StatusType.WAITING_TO_ACCEPT:
                return (
                    <React.Fragment>
                        <Button label="REJECT" className="p-button-raised p-button-text" onClick={reject}></Button>
                        <Button label="ACCEPT" className="p-button-raised p-button-text" onClick={accept}></Button>
                    </React.Fragment>
                )
            case StatusType.ASK_MODIFICATION:
                return (
                    <React.Fragment>
                        <Button label="REPLAY" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )
            case StatusType.ACCEPTED:
                return (
                    <React.Fragment>
                        <Button label="ACCEPT" className="p-button-raised p-button-text" onClick={accept}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )
            case StatusType.STARTED:
                return (
                    <React.Fragment>
                        <Button label="START" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )

            case StatusType.IN_PROGRESS:
                return (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )

            case StatusType.FINISHED:
                return (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )

            case StatusType.REJECTED:
                return (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )

            case StatusType.CONFIRMED:
                return (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )

            case StatusType.END:
                return (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )

            case StatusType.CANCELLED:
                return (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <Button label="INIT" className="p-button-raised p-button-text" onClick={init}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )
        }
    }

    const dialogFuncMap = {
        'displayReason': setDisplayReason,
        'displaySignature': displaySignature
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        // if (position) {
        //     setPosition(position);
        // }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="CANCEL" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="SAVE" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }

    const clearSignature = () => {
        signatureRef.clear()
    }
    return (

        <React.Fragment>
            <Fieldset legend="Milestone" >
                <main className="p-fluid">
                    {/* <input type="hidden" name="id" value={mileston.id} />
                    <input type="hidden" name="projectId" value={mileston.projectId} /> */}
                    {/* <div className="p-field p-grid">
                        <label htmlFor="id" className="p-col-12 p-md-3">ID</label>
                        <div className="p-col-6 p-md-9">
                            <InputText id="id" type="text" value={mileston.id} disabled />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="projectname" className="p-col-12 p-md-3">Project Name</label>
                        <div className="p-col-6 p-md-9">
                            <InputText id="firstname4" type="text" readOnly={true} value={mileston.projectId} onChange={(e) => onInputChange(e, 'name')} required />
                        </div>
                    </div> */}

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

                    <div className="p-field p-grid">
                        <label className="p-col-4 p-md-3">Attach File</label>
                        <div className="p-col-8 p-md-9 ">
                            <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={onBasicUploadAuto} auto chooseLabel="Browse" />
                        </div>
                    </div>
                </main>
                <footer>
                    {renderStatusButtons(mileston.status)}
                </footer>
            </Fieldset>

            {/* <SignatureCanvas penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} /> */}



            {/* 
   
        <SignaturePad canvasProps={{className: styles.signatureRef}}
          ref={(ref) => { this.signatureRef = ref }} />
      
        <button className={styles.buttons} onClick={this.clear}>
          Clear
        </button>
        <button className={styles.buttons} onClick={this.trim}>
          Trim
        </button> */}

            <Dialog header="Reason" visible={displayReason} style={{ width: '50vw' }} footer={renderFooter('displayReason')} onHide={() => onHide('displayReason')} baseZIndex={1000}>
                <div className="p-field p-grid">
                    <div className="p-col-12 ">
                        Please write a reason of your rejection
                        <InputTextarea value={reason} onChange={(e) => setReason(e.target.value)} rows={5} cols={30} style={{ 'width': 'inherit' }} />
                    </div>
                </div>
            </Dialog>

            <Dialog header="Signature" visible={displaySignature} style={{ width: '660px' }} footer={
                (
                    <Button label="SIGNED" icon="pi pi-check" onClick={() => onHide('displaySignature')} autoFocus />
                )
            } onHide={() => onHide('displayReason')} baseZIndex={1000}>
                <div className="p-field p-grid">
                    <div className="p-col-12 ">
                        <div>
                            <span>This action required your signature</span>
                            <i className="pi pi-replay" onClick={clearSignature} ></i>
                        </div>
                        <SignaturePad canvasProps={{ width: 600, height: 200, className: 'x-signature-pad' }}
                        
                            ref={signatureRef}
                        />
                    </div>
                </div>
            </Dialog>



        </React.Fragment>
    )
}

export default MilestoneForm;







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







