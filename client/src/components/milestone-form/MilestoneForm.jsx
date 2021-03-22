import React, { useState, useEffect, useRef, useContext } from 'react';
import SignaturePad from 'react-signature-canvas';
import {
    Button,
    Fieldset,
    InputText,
    InputTextarea,
    Calendar,
    FileUpload,
    Dialog,
    Tooltip
} from '../../helpers/ui.modue';
import moment from 'moment';
import StatusType from '../../core/enums/StatusType';
import './MilestoneForm.scss';
import Milestone from '../../core/models/milestone.model';
import UserContext from '../../contexts/user-context';
import MilestonesService from '../../services/MilestonesService';

const MilestoneForm = (props) => {
    const [milestone, setMilestone] = useState(new Milestone(props.milestone));
    const [displayReason, setDisplayReason] = useState(false);
    const [displaySignature, setDisplaySignature] = useState(false);
    const user = useContext(UserContext);
    const [reason, setReason] = useState('');
    const signatureRef = useRef();

    const service = new MilestonesService();

    useEffect(() => {
        console.log(user, milestone)
    }, [])

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';

        let _milestone = { ...milestone };

        _milestone[name] = val;

        setMilestone(_milestone);
    }

    const onDateChange = (val, name) => {
        let _milestone = { ...milestone };
        _milestone[name] = val;
        setMilestone(_milestone);
    }

    const string2Date = (date) => {
        return moment.utc(date).toDate();
    }

    const clear = () => {
        signatureRef.current.clear();
    }

    const save = () => {
        service.put(milestone.id, milestone)
        // signatureRef.current.toBlob((blob) => {
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
        // console.log(signatureRef.current.toDataURL('image/jpeg', 1))
        // //         .toDataURL('image/png')
        // // })
    }

    const init = () => {
        
        service.post(milestone)
    }

    const reject = () => {
        setDisplayReason(true)
    }

    const accept = () => {
        setDisplaySignature(true)
    }


    const onBasicUploadAuto = () => {

    }

    const close = () => {
        props.closeHandler();
    }

    const renderStatusButtons = (status) => {

        let right = "";

        console.log("status==", status);

        switch (status) {
            case StatusType.INIT:
                console.log("1 - INIT")
                right = (
                    <React.Fragment>
                        <Button label="SAVE" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.WAITING_TO_ACCEPT:
                console.log("2 - WAITING_TO_ACCEPT")                
                right = (
                    <React.Fragment>
                        <Button label="REJECT" className="p-button-raised p-button-text" onClick={reject}></Button>
                        <Button label="ACCEPT" className="p-button-raised p-button-text" onClick={accept}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.ASK_MODIFICATION:
                console.log("3 - ASK_MODIFICATION")                                
                right = (
                    <React.Fragment>
                        <Button label="REPLAY" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.ACCEPTED:
                console.log("4 - ACCEPTED")                                
                right = (
                    <React.Fragment>
                        <Button label="ACCEPT" className="p-button-raised p-button-text" onClick={accept}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.STARTED:
                console.log("5 - STARTED")                                                
                right = (
                    <React.Fragment>
                        <Button label="START" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.IN_PROGRESS:
                console.log("6 - IN_PROGRESS")                                                                
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.FINISHED:
                console.log("7 - FINISHED")                                                                                
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.REJECTED:
                console.log("8 - REJECTED")                                                                                                
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.CONFIRMED:
                console.log("9 - CONFIRMED")                                                                                                                
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.END:
                console.log("10 - END")                                                                                                                                
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.CANCELLED:
                console.log("11 - CANCELLED")                                                                                                                                                
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            default:
                console.log("12 - default")                                                                                                                                                                
                right = (
                    <React.Fragment>
                        <Button label="INIT" className="p-button-raised p-button-text" onClick={init}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                )
        }
        return (
            <React.Fragment>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                        {right}
                    </span>
                    <span>
                        <Button label="CLOSE" className="p-button-raised p-button-text" onClick={close}></Button>
                    </span>
                </div>
            </React.Fragment>
        )
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
                <Button label="CANCEL" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-raised p-button-text" />
                <Button label="SAVE" icon="pi pi-check" onClick={() => onHide(name)} autoFocus className="p-button-raised p-button-text" />
            </div>
        );
    }

    const clearSignature = () => {
        signatureRef.current.clear()
    }

    const saveSignature = () => {
        if (signatureRef.current.isEmpty()) {
            alert('Please provide a signature then save')
            return;
        }
        setDisplaySignature(false);
    }

    return (
        <React.Fragment>
            <Fieldset legend="Milestone" >
                <main className="p-fluid">
                    {/* <input type="hidden" name="id" value={milestone.id} />
                    <input type="hidden" name="projectId" value={milestone.projectId} /> */}
                    {/* <div className="p-field p-grid">
                        <label htmlFor="id" className="p-col-12 p-md-3">ID</label>
                        <div className="p-col-6 p-md-9">
                            <InputText id="id" type="text" value={milestone.id} disabled />
                        </div>
                    </div>*/}

                    <div className="p-field p-grid">
                        <label htmlFor="projectname" className="p-col-12 p-md-3">Name</label>
                        <div className="p-col-6 p-md-9">
                            <InputText id="name" type="text" value={milestone.name} onChange={(e) => onInputChange(e, 'name')} required />
                        </div>
                    </div> 

                    <div className="p-field p-grid">
                        <label htmlFor="description" className="p-col-12 p-md-3">Description</label>
                        <div className="p-col-12 p-md-9 ">
                            <InputTextarea id="description" value={milestone.description} onChange={(e) => onInputChange(e, 'description')} required type="text" required rows={5} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="dateStart" className="p-col-12 p-md-3">Date Start</label>
                        <div className="p-col-12 p-md-9 ">
                            <Calendar id="dateStart" value={string2Date(milestone.dateStart)} onChange={(e) => onDateChange(e.value, 'dateStart')} mask="99/99/9999" />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="estimateDateEnd" className="p-col-4 p-md-3">Estimate Date End</label>
                        <div className="p-col-8 p-md-9 ">
                            <Calendar id="estimateDateEnd" value={string2Date(milestone.estimateDateEnd)} onChange={(e) => onDateChange(e.value, 'estimateDateEnd')} mask="99/99/9999" />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="dateEnd" className="p-col-12 p-md-3">Date End</label>
                        <div className="p-col-12 p-md-9 ">
                            <Calendar id="dateEnd" value={string2Date(milestone.dateEnd)} onChange={(e) => onDateChange(e.value, 'dateEnd')} mask="99/99/9999" />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="estimatePrice" className="p-col-4 p-md-3">Estimate Price</label>
                        <div className="p-col-8 p-md-9 ">
                            <InputText id="estimatePrice" type="text" value={milestone.estimatePrice} onChange={(e) => onInputChange(e, 'estimatePrice')} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="actualPrice" className="p-col-4 p-md-3">Actual Price</label>
                        <div className="p-col-8 p-md-9 ">
                            <InputText id="actualPrice" type="text" value={milestone.actualPrice} onChange={(e) => onInputChange(e, 'actualPrice')} />

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
                    {renderStatusButtons(milestone.status)}
                </footer>
            </Fieldset>

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
                    <Button label="SAVE" icon="pi pi-check" onClick={saveSignature} autoFocus />
                )
            } onHide={() => setDisplaySignature(false)} baseZIndex={1000}>
                <div className="p-field p-grid">
                    <div className="p-col-12 ">
                        <span>This action required your signature</span>
                        <SignaturePad
                            canvasProps={{ width: 600, height: 200, className: 'x-signature-pad' }}
                            ref={signatureRef}
                        />
                        <i className="pi pi-undo x-tooltip" onClick={clearSignature} title="clear signature" tooltip="clear signature"></i>
                    </div>
                </div>
            </Dialog>

            <Tooltip target=".x-tooltip" />
        </React.Fragment>
    )
}

export default MilestoneForm;