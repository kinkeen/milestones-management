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
    Tooltip,
    Card
} from '../../helpers/ui.modue';

import moment from 'moment';
import StatusType from '../../core/enums/StatusType';
import './MilestoneForm.scss';
import UserContext from '../../contexts/user-context';
import MilestonesService from '../../services/MilestonesService';
import useSharedProject from '../../contexts/project-context';
import Milestone from '../../core/models/milestone.model'

const MilestoneForm = (props) => {
    const [displaySignature, setDisplaySignature] = useState(false);
    const [displayReason, setDisplayReason] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [reason, setReason] = useState('');
    const user = useContext(UserContext);
    const signatureRef = useRef();
    const { project, setProject, milestone, setMilestone } = useSharedProject();
    const service = new MilestonesService();

    //#region Hooks
    useEffect(() => {
        console.log('MilestoneForm: ', user, project, milestone)
    }, [])
    //#endregion Hooks

    //#region Methods
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

    const onBasicUploadAuto = () => {

    }

    const clear = () => {
        signatureRef.current.clear();
    }

    const save = (status) => {

        switch (status) {
            case StatusType.INIT:
                return service.post(milestone);

            case StatusType.WAITING_TO_ACCEPT:
                status = StatusType.ASK_MODIFICATION;
                break;

            case StatusType.ASK_MODIFICATION:
                status = StatusType.WAITING_TO_ACCEPT;
                break;

            case StatusType.ACCEPTED:

                break;
            case StatusType.STARTED:

                break;
            case StatusType.IN_PROGRESS:

                break;
            case StatusType.FINISHED:

                break;
            case StatusType.REJECTED:

                break;

            case StatusType.CONFIRMED:
                break;

            case StatusType.END:

                break;
            case StatusType.CANCELLED:

                break;
            default:
                break;
        }

        return new Promise((resolve, reject) => {

            setWaiting(true);

            const request = { ...milestone };

            request.status = status;

            service.put(milestone.id, request).then((response) => {

                setWaiting(false);

                resolve(response);
            });
        });
    }

    const reject = () => {
        setDisplayReason(true)
    }

    const accept = () => {
        setDisplaySignature(true)
    }

    const close = () => {
        props.closeHandler();
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

    const clearSignature = () => {
        signatureRef.current.clear()
    }

    const saveSignature = () => {
        if (signatureRef.current.isEmpty()) {
            alert('Please provide a signature then save')
            return;
        }

       setWaiting(true);

        service.signature({
            milestoneId: milestone.id,
            userId: 1, // The ID of current user
            data: signatureRef.current.getTrimmedCanvas().toDataURL('image/png')
        }).then(() => {
            save(StatusType.ACCEPTED).then((response) => {
                setDisplaySignature(false);
                setMilestone(new Milestone(response.data));
            });
        });


        // const url = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');

        // fetch(url)
        //     .then(res => res.arrayBuffer())
        //     .then((buffer) => {
        //         console.log(buffer)
        //         console.log(window.btoa(buffer))
        //         // service.signature({
        //         //     milestoneId: milestone.id,
        //         //     userId: 1, // The ID of current user
        //         //     data: new Uint8Array(buffer)
        //         // }).then(() => {
        //         //     save(StatusType.ACCEPTED).then((response) => {
        //         //         setDisplaySignature(false);
        //         //         setMilestone(new Milestone(response.data));
        //         //     });
        //         // });
        //     });

        //     fetch(url)
        //     .then(res => res.blob())
        //     .then((buffer) => {
        //         console.log(buffer)
        //         console.log(window.btoa(buffer))
        //         // service.signature({
        //         //     milestoneId: milestone.id,
        //         //     userId: 1, // The ID of current user
        //         //     data: new Uint8Array(buffer)
        //         // }).then(() => {
        //         //     save(StatusType.ACCEPTED).then((response) => {
        //         //         setDisplaySignature(false);
        //         //         setMilestone(new Milestone(response.data));
        //         //     });
        //         // });
        //     });

        //     // decode('AcAAFBAO5Az....AQAAAFBCO5gT/AEAABT', 'base64')
    }

    const saveReason = () => {
        save(StatusType.WAITING_TO_ACCEPT).then(response => {
            const milestone = new Milestone(response.data);
            if (project.milestones instanceof Array) {
                const item = project.milestones.find(item => item.id == milestone.id);
                const index = project.milestones.indexOf(item);
                project.milestones.splice(index, 1);
                project.milestones.push(milestone);
                setProject(project);
                setMilestone(milestone);
                setDisplayReason(false);
            }
        })
    }
    //#endregion Methods

    //#region JSX
    const renderStatusButtons = (status) => {

        let right = "";

        switch (status) {
            case StatusType.INIT:
                right = (
                    <React.Fragment>
                        <Button label="SAVE" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.INIT).then((response) => {
                                const milestone = new Milestone(response.data);
                                project.milestones.push(milestone);
                                setProject(project);
                                setMilestone(milestone);
                            });
                        }} disabled={waiting}></Button>
                        {<Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>}
                    </React.Fragment>
                );
                break
            case StatusType.WAITING_TO_ACCEPT:
                right = (
                    <React.Fragment>
                        <Button label="REJECT" className="p-button-raised p-button-text" onClick={reject} disabled={waiting}></Button>
                        <Button label="ACCEPT" className="p-button-raised p-button-text" onClick={accept} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.ASK_MODIFICATION:
                right = (
                    <React.Fragment>
                        <Button label="REPLAY" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.ASK_MODIFICATION).then((response) => {
                                setMilestone(new Milestone(response.data));
                            });
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.ACCEPTED:
                right = (
                    <React.Fragment>
                        <Button label="ACCEPT" className="p-button-raised p-button-text" onClick={accept} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.STARTED:
                right = (
                    <React.Fragment>
                        <Button label="START" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.STARTED).then((response) => {
                                setMilestone(new Milestone(response.data));
                            });
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.IN_PROGRESS:
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.IN_PROGRESS).then((response) => {
                                setMilestone(new Milestone(response.data));
                            });
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.FINISHED:
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.FINISHED).then((response) => {
                                setMilestone(new Milestone(response.data));
                            });
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.REJECTED:
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.REJECTED).then((response) => {
                                setMilestone(new Milestone(response.data));
                            });
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.CONFIRMED:
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.CONFIRMED)
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.END:
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.END).then((response) => {
                                setMilestone(new Milestone(response.data));
                            });
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            case StatusType.CANCELLED:
                right = (
                    <React.Fragment>
                        <Button label="Save" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.CANCELLED).then((response) => {
                                setMilestone(new Milestone(response.data));
                            });
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
                    </React.Fragment>
                );
                break
            default:
                right = (
                    <React.Fragment>
                        <Button label="SAVE" className="p-button-raised p-button-text" onClick={() => {
                            save(StatusType.INIT)
                        }} disabled={waiting}></Button>
                        <Button label="CANCEL" className="p-button-raised p-button-text" onClick={clear} disabled={waiting}></Button>
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
                        <Button label="CLOSE" className="p-button-raised p-button-text" onClick={close} disabled={waiting}></Button>
                    </span>
                </div>
            </React.Fragment>
        )
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="CANCEL" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-raised p-button-text" />
                <Button label="SAVE" icon="pi pi-check" onClick={() => onHide(name)} autoFocus className="p-button-raised p-button-text" />
            </div>
        );
    }

    return (
        <React.Fragment>
            <Card className="x-milestone-form">
                <Fieldset legend="MILESTONE FORM">
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
                            <div className="p-col-8 p-md-9">
                                <FileUpload mode="basic" name="demo[]" url="./upload.php" accept="image/*" maxFileSize={1000000} onUpload={onBasicUploadAuto} auto chooseLabel="Browse" />
                            </div>
                        </div>
                    </main>
                    <footer>
                        {renderStatusButtons(milestone.status)}
                    </footer>
                </Fieldset>
            </Card>

            <Dialog header="Reason" visible={displayReason} style={{ width: '50vw' }} footer={(
                <Button label="SAVE" icon="pi pi-check" onClick={saveReason} autoFocus disabled={waiting} />
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
                    <Button label="SAVE" icon="pi pi-check" onClick={saveSignature} autoFocus disabled={waiting} />
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
    //#endregion JSX
}

export default MilestoneForm;