/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import UploadFilesToS3 from "../../../services/UploadFilesToS3";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ProposalsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [projectName, setProjectName] = useState([])
const [approvedBy, setApprovedBy] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount projects
                    client
                        .service("projects")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProjectsId } })
                        .then((res) => {
                            setProjectName(res.data.map((e) => { return { name: e['projectName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Projects", type: "error", message: error.message || "Failed get projects" });
                        });
                }, []);
 useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setApprovedBy(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            proposalRef: _entity?.proposalRef,
proposalName: _entity?.proposalName,
projectName: _entity?.projectName?._id,
dueDate: _entity?.dueDate,
approved: _entity?.approved,
approvedBy: _entity?.approvedBy?._id,
remarks: _entity?.remarks,
file: _entity?.file,
        };

        setLoading(true);
        try {
            
        await client.service("proposals").patch(_entity._id, _data);
        const eagerResult = await client
            .service("proposals")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "projectName",
                    service : "projects",
                    select:["projectName"]},{
                    path : "approvedBy",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info proposals updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const projectNameOptions = projectName.map((elem) => ({ name: elem.name, value: elem.value }));
const approvedByOptions = approvedBy.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Proposals" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="proposals-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="proposalRef">Proposal Ref:</label>
                <InputText id="proposalRef" className="w-full mb-3 p-inputtext-sm" value={_entity?.proposalRef} onChange={(e) => setValByKey("proposalRef", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["proposalRef"]) && (
              <p className="m-0" key="error-proposalRef">
                {error["proposalRef"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="proposalName">Proposal Name:</label>
                <InputText id="proposalName" className="w-full mb-3 p-inputtext-sm" value={_entity?.proposalName} onChange={(e) => setValByKey("proposalName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["proposalName"]) && (
              <p className="m-0" key="error-proposalName">
                {error["proposalName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectName">Project Name:</label>
                <Dropdown id="projectName" value={_entity?.projectName?._id} optionLabel="name" optionValue="value" options={projectNameOptions} onChange={(e) => setValByKey("projectName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectName"]) && (
              <p className="m-0" key="error-projectName">
                {error["projectName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dueDate">Due Date:</label>
                <Calendar id="dueDate" value={_entity?.dueDate ? new Date(_entity?.dueDate) : null} onChange={ (e) => setValByKey("dueDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dueDate"]) && (
              <p className="m-0" key="error-dueDate">
                {error["dueDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="approved">Approved:</label>
                <Checkbox id="approved" className="ml-3" checked={_entity?.approved} onChange={(e) => setValByKey("approved", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approved"]) && (
              <p className="m-0" key="error-approved">
                {error["approved"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="approvedBy">Approved By:</label>
                <Dropdown id="approvedBy" value={_entity?.approvedBy?._id} optionLabel="name" optionValue="value" options={approvedByOptions} onChange={(e) => setValByKey("approvedBy", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["approvedBy"]) && (
              <p className="m-0" key="error-approvedBy">
                {error["approvedBy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="remarks">Remarks:</label>
                <InputTextarea id="remarks" rows={5} cols={30} value={_entity?.remarks} onChange={ (e) => setValByKey("remarks", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["remarks"]) && (
              <p className="m-0" key="error-remarks">
                {error["remarks"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 field">
                <span className="align-items-center">
                    <label htmlFor="file">File:</label>
                    <UploadFilesToS3 type={'edit'} setValByKey={setValByKey} onSave={onSave} id={urlParams.singleProposalsId} serviceName="proposals" />
                </span>
                <small className="p-error">
                {!_.isEmpty(error["file"]) && (
                  <p className="m-0" key="error-file">
                    {error["file"]}
                  </p>
                )}
              </small>
                </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ProposalsEditDialogComponent);
