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
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
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

const QuotesEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [projectName, setProjectName] = useState([]);
  const [approvedBy, setApprovedBy] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  useEffect(() => {
    //on mount projects
    client
      .service("projects")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleProjectsId,
        },
      })
      .then((res) => {
        setProjectName(
          res.data.map((e) => {
            return { name: e["projectName"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Projects",
          type: "error",
          message: error.message || "Failed get projects",
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
      quoteNo: _entity?.quoteNo,
      projectName: _entity?.projectName?._id,
      applicationCost: _entity?.applicationCost,
      supportCost: _entity?.supportCost,
      firstMilestonePayment: _entity?.firstMilestonePayment,
      secondMilestonePayment: _entity?.secondMilestonePayment,
      thirdMilestonePayment: _entity?.thirdMilestonePayment,
      fourthMilestonePayment: _entity?.fourthMilestonePayment,
      fifthMilestonePayment: _entity?.fifthMilestonePayment,
      applicationCostSST: _entity?.applicationCostSST,
      supportCostSST: _entity?.supportCostSST,
      revision: _entity?.revision,
      approved: _entity?.approved,
      approvedBy: _entity?.approvedBy?._id,
      file: _entity?.file,
    };

    console.log(_data);
    console.log(_entity?.applicationCost);

    setLoading(true);
    try {
      await client.service("quotes").patch(_entity._id, _data);
      const eagerResult = await client.service("quotes").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
          $populate: [
            {
              path: "projectName",
              service: "projects",
              select: ["projectName"],
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
        message: "Info quotes updated successfully",
      });
      setLoading(false);
      props.onEditResult(eagerResult.data[0]);
    } catch (error) {
      setLoading(false);
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

  const projectNameOptions = projectName.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const approvedByOptions = approvedBy.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Edit Quotes"
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
        role="quotes-edit-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="quoteNo">Quote No:</label>
            <InputText
              id="quoteNo"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.quoteNo}
              onChange={(e) => setValByKey("quoteNo", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["quoteNo"]) && (
              <p className="m-0" key="error-quoteNo">
                {error["quoteNo"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="projectName">Project Name:</label>
            <Dropdown
              id="projectName"
              value={_entity?.projectName?._id}
              optionLabel="name"
              optionValue="value"
              options={projectNameOptions}
              onChange={(e) => setValByKey("projectName", { _id: e.value })}
            />
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
            <label htmlFor="applicationCost">Application Cost:</label>
            <InputNumber
              id="applicationCost"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.applicationCost}
              onValueChange={(e) => setValByKey("applicationCost", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["applicationCost"]) && (
              <p className="m-0" key="error-applicationCost">
                {error["applicationCost"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="supportCost">Support Cost:</label>
            <InputNumber
              id="supportCost"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.supportCost}
              onValueChange={(e) => setValByKey("supportCost", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["supportCost"]) && (
              <p className="m-0" key="error-supportCost">
                {error["supportCost"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="firstMilestonePayment">
              First Milestone Payment:
            </label>
            <InputNumber
              id="firstMilestonePayment"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.firstMilestonePayment}
              onValueChange={(e) =>
                setValByKey("firstMilestonePayment", e.value)
              }
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["firstMilestonePayment"]) && (
              <p className="m-0" key="error-firstMilestonePayment">
                {error["firstMilestonePayment"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="secondMilestonePayment">
              Second Milestone Payment:
            </label>
            <InputNumber
              id="secondMilestonePayment"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.secondMilestonePayment}
              onValueChange={(e) =>
                setValByKey("secondMilestonePayment", e.value)
              }
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["secondMilestonePayment"]) && (
              <p className="m-0" key="error-secondMilestonePayment">
                {error["secondMilestonePayment"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="thirdMilestonePayment">
              Third Milestone Payment:
            </label>
            <InputNumber
              id="thirdMilestonePayment"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.thirdMilestonePayment}
              onValueChange={(e) =>
                setValByKey("thirdMilestonePayment", e.value)
              }
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["thirdMilestonePayment"]) && (
              <p className="m-0" key="error-thirdMilestonePayment">
                {error["thirdMilestonePayment"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="fourthMilestonePayment">
              Fourth Milestone Payment:
            </label>
            <InputNumber
              id="fourthMilestonePayment"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.fourthMilestonePayment}
              onValueChange={(e) =>
                setValByKey("fourthMilestonePayment", e.value)
              }
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["fourthMilestonePayment"]) && (
              <p className="m-0" key="error-fourthMilestonePayment">
                {error["fourthMilestonePayment"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="fifthMilestonePayment">
              Fifth Milestone Payment:
            </label>
            <InputNumber
              id="fifthMilestonePayment"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.fifthMilestonePayment}
              onValueChange={(e) =>
                setValByKey("fifthMilestonePayment", e.value)
              }
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["fifthMilestonePayment"]) && (
              <p className="m-0" key="error-fifthMilestonePayment">
                {error["fifthMilestonePayment"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="applicationCostSST">Application Cost SST:</label>
            <InputNumber
              id="applicationCostSST"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.applicationCostSST}
              onValueChange={(e) => setValByKey("applicationCostSST", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["applicationCostSST"]) && (
              <p className="m-0" key="error-applicationCostSST">
                {error["applicationCostSST"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="supportCostSST">Support Cost SST:</label>
            <InputNumber
              id="supportCostSST"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.supportCostSST}
              onValueChange={(e) => setValByKey("supportCostSST", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["supportCostSST"]) && (
              <p className="m-0" key="error-supportCostSST">
                {error["supportCostSST"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="revision">Revision:</label>
            <InputNumber
              id="revision"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.revision}
              onChange={(e) => setValByKey("revision", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["revision"]) && (
              <p className="m-0" key="error-revision">
                {error["revision"]}
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
        <div className="col-12 field">
          <span className="align-items-center">
            <label htmlFor="file">File:</label>
            <UploadFilesToS3
              type={"edit"}
              setValByKey={setValByKey}
              onSave={onSave}
              id={urlParams.singleQuotesId}
              serviceName="quotes"
            />
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

export default connect(mapState, mapDispatch)(QuotesEditDialogComponent);
