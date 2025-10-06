/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";

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

const ProjectProposalsEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [proposalRef, setProposalRef] = useState([]);
  const [quotation, setQuotation] = useState([]);
  const [approvedBy, setApprovedBy] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  useEffect(() => {
    //on mount proposals
    client
      .service("proposals")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleProposalsId,
        },
      })
      .then((res) => {
        setProposalRef(
          res.data.map((e) => {
            return { name: e["proposalRef"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Proposals",
          type: "error",
          message: error.message || "Failed get proposals",
        });
      });
  }, []);
  useEffect(() => {
    //on mount quotes
    client
      .service("quotes")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleQuotesId,
        },
      })
      .then((res) => {
        setQuotation(
          res.data.map((e) => {
            return { name: e["quoteNo"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Quotes",
          type: "error",
          message: error.message || "Failed get quotes",
        });
      });
  }, []);
  useEffect(() => {
    //on mount users
    client
      .service("users")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleUsersId,
        },
      })
      .then((res) => {
        setApprovedBy(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Users",
          type: "error",
          message: error.message || "Failed get users",
        });
      });
  }, []);

  const onSave = async () => {
    let _data = {
      proposalRef: _entity?.proposalRef?._id,
      quotation: _entity?.quotation?._id,
      approved: _entity?.approved,
      approvedDate: _entity?.approvedDate,
      approvedBy: _entity?.approvedBy?._id,
      rejected: _entity?.rejected,
      remarks: _entity?.remarks,
    };

    setLoading(true);
    try {
      await client.service("projectProposals").patch(_entity._id, _data);
      const eagerResult = await client.service("projectProposals").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
          $populate: [
            {
              path: "proposalRef",
              service: "proposals",
              select: ["proposalRef"],
            },
            {
              path: "quotation",
              service: "quotes",
              select: ["quoteNo"],
            },
            {
              path: "approvedBy",
              service: "users",
              select: ["name"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info projectProposals updated successfully",
      });
      props.onEditResult(eagerResult.data[0]);
    } catch (error) {
      console.debug("error", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update info",
      );
      props.alert({
        type: "error",
        title: "Edit info",
        message: "Failed to update info",
      });
    }
    setLoading(false);
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  const proposalRefOptions = proposalRef.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const quotationOptions = quotation.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const approvedByOptions = approvedBy.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Edit ProjectProposals"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max scalein animation-ease-in-out animation-duration-1000"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="projectProposals-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="proposalRef">Proposal Reference:</label>
            <Dropdown
              id="proposalRef"
              value={_entity?.proposalRef?._id}
              optionLabel="name"
              optionValue="value"
              options={proposalRefOptions}
              onChange={(e) => setValByKey("proposalRef", { _id: e.value })}
            />
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
            <label htmlFor="quotation">Quotation:</label>
            <Dropdown
              id="quotation"
              value={_entity?.quotation?._id}
              optionLabel="name"
              optionValue="value"
              options={quotationOptions}
              onChange={(e) => setValByKey("quotation", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["quotation"]) && (
              <p className="m-0" key="error-quotation">
                {error["quotation"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field flex">
          <span className="align-items-center">
            <label htmlFor="approved">Approved:</label>
            <Checkbox
              id="approved"
              className="ml-3"
              checked={_entity?.approved}
              onChange={(e) => setValByKey("approved", e.checked)}
            />
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
            <label htmlFor="approvedDate">Approved Date:</label>
            <Calendar
              id="approvedDate"
              value={
                _entity?.approvedDate ? new Date(_entity?.approvedDate) : null
              }
              dateFormat="dd/mm/yy"
              onChange={(e) => setValByKey("approvedDate", new Date(e.value))}
              showIcon
              showButtonBar
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["approvedDate"]) && (
              <p className="m-0" key="error-approvedDate">
                {error["approvedDate"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="approvedBy">Approved By:</label>
            <Dropdown
              id="approvedBy"
              value={_entity?.approvedBy?._id}
              optionLabel="name"
              optionValue="value"
              options={approvedByOptions}
              onChange={(e) => setValByKey("approvedBy", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["approvedBy"]) && (
              <p className="m-0" key="error-approvedBy">
                {error["approvedBy"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field flex">
          <span className="align-items-center">
            <label htmlFor="rejected">Rejected:</label>
            <Checkbox
              id="rejected"
              className="ml-3"
              checked={_entity?.rejected}
              onChange={(e) => setValByKey("rejected", e.checked)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["rejected"]) && (
              <p className="m-0" key="error-rejected">
                {error["rejected"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="remarks">Remarks:</label>
            <InputTextarea
              id="remarks"
              rows={5}
              cols={30}
              value={_entity?.remarks}
              onChange={(e) => setValByKey("remarks", e.target.value)}
              autoResize
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["remarks"]) && (
              <p className="m-0" key="error-remarks">
                {error["remarks"]}
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

export default connect(
  mapState,
  mapDispatch,
)(ProjectProposalsEditDialogComponent);
