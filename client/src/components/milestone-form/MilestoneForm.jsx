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
import UserContext from '../../contexts/user-context';
import MilestonesService from '../../services/MilestonesService';
import useSharedProject from '../../contexts/project-context';

const MilestoneForm = (props) => {
    const [displaySignature, setDisplaySignature] = useState(false);
    const [displayReason, setDisplayReason] = useState(false);
    const user = useContext(UserContext);
    const [reason, setReason] = useState('');
    const signatureRef = useRef();
    const { project, setProject, milestone, setMilestone } = useSharedProject();
    const service = new MilestonesService();

    useEffect(() => {
        console.log('MilestoneForm: ', user, project, milestone)
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
        service.post(milestone).then(response => {
            project.milestones.push(response.data);
            setProject(project);
        });
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

        switch (status) {
            case StatusType.INIT:

                right = (
                    <React.Fragment>
                        <Button label="INIT" className="p-button-raised p-button-text" onClick={init}></Button>
                        {<Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>}
                    </React.Fragment>
                );
                break
            case StatusType.WAITING_TO_ACCEPT:
                right = (
                    <React.Fragment>
                        <Button label="REJECT" className="p-button-raised p-button-text" onClick={reject}></Button>
                        <Button label="ACCEPT" className="p-button-raised p-button-text" onClick={accept}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.ASK_MODIFICATION:
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
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.CANCELLED:
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={save}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear}></Button>
                    </React.Fragment>
                );
                break
            default:
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
        // if (signatureRef.current.isEmpty()) {
        //     alert('Please provide a signature then save')
        //     return;
        // }
        // setDisplaySignature(false);
        

        console.log(signatureRef.current.toData())
        const url = signatureRef.current.toDataURL('')
        window.open(url)
        // console.log(signatureRef.current.fromDataURL())
        // console.log(signatureRef.current.getCanvas())
        // console.log(signatureRef.current.getSignaturePad())
        // console.log(signatureRef.current.getTrimmedCanvas())
    }

    const saveReason = () => {
        // Save comment with owner id => user.id, milestone_id => milestone.id
        // ask_modification

        service.put(milestone.id, {
            status: 'ask_modification'
        }).then(response => {
            const milestone = project.milestones.find(item => item.id == response.data.id);
            for(let key in response.data) {
                if (key in milestone && milestone[key] != response.data[key]) {
                    milestone[key] = response.data[key];
                }
            }
            setProject(project);
        })
    }

    return (
        <React.Fragment>
            <Fieldset legend="Milestone" >
                <main className="p-fluid">

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

            <Dialog header="Reason" visible={displayReason} style={{ width: '50vw' }} footer={(
                <Button label="SAVE" icon="pi pi-check" onClick={saveReason} autoFocus />
            )} onHide={() => onHide('displayReason')} baseZIndex={1000}>
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