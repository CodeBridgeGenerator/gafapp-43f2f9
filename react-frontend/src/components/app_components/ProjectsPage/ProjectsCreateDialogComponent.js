import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Chips } from "primereact/chips";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const ProjectsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [company, setCompany] = useState([]);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization(
        { ...props?.entity, ...init },
        [company, contact],
        setError,
      );
    }
    set_entity({ ...init });
    setError({});
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.projectName)) {
      error["projectName"] = `Project Name field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.idGAF)) {
      error["idGAF"] = `Id GAF field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.title)) {
      error["title"] = `Title field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.problemStatement)) {
      error["problemStatement"] = `Problem Statement field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.relevantAITechnologies)) {
      error["relevantAITechnologies"] =
        `Relevant AI Technologies field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.expectedOutcomes)) {
      error["expectedOutcomes"] =
        `Expected Outcomes / Success Me field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.currentSolutions)) {
      error["currentSolutions"] = `Current Solutions field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.targetUsers)) {
      error["targetUsers"] = `Target Users field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.dataAvailability)) {
      error["dataAvailability"] =
        `Data Availability & Readiness field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.requirements)) {
      error["requirements"] =
        `Integration Deploy Requirement field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.budgetAllocation)) {
      error["budgetAllocation"] = `Budget Allocation field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.referredCollaborationTimeline)) {
      error["referredCollaborationTimeline"] =
        `Referred Collaboration Timeline field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.tags)) {
      error["tags"] = `Tags field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.founded)) {
      error["founded"] = `Founded field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.headquarters)) {
      error["headquarters"] = `Headquarters field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.deadline)) {
      error["deadline"] = `Deadline field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.daysRemaining)) {
      error["daysRemaining"] = `Days Remaining field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.budget)) {
      error["budget"] = `Budget field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.category)) {
      error["category"] = `Category field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.enterprise)) {
      error["enterprise"] = `Enterprise field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.posted)) {
      error["posted"] = `Posted field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.others)) {
      error["others"] = `Others field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.path)) {
      error["path"] = `Path field is required`;
      ret = false;
    }
    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      company: _entity?.company?._id,
      contact: _entity?.contact?._id,
      projectName: _entity?.projectName,
      idGAF: _entity?.idGAF,
      title: _entity?.title,
      problemStatement: _entity?.problemStatement,
      relevantAITechnologies: _entity?.relevantAITechnologies,
      expectedOutcomes: _entity?.expectedOutcomes,
      currentSolutions: _entity?.currentSolutions,
      targetUsers: _entity?.targetUsers,
      dataAvailability: _entity?.dataAvailability,
      requirements: _entity?.requirements,
      budgetAllocation: _entity?.budgetAllocation,
      referredCollaborationTimeline: _entity?.referredCollaborationTimeline,
      tags: _entity?.tags,
      founded: _entity?.founded,
      headquarters: _entity?.headquarters,
      deadline: _entity?.deadline,
      daysRemaining: _entity?.daysRemaining,
      budget: _entity?.budget,
      category: _entity?.category,
      enterprise: _entity?.enterprise,
      posted: _entity?.posted,
      others: _entity?.others,
      path: _entity?.path,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("projects").create(_data);
      const eagerResult = await client.service("projects").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "company",
              service: "companies",
              select: ["name"],
            },
            {
              path: "contact",
              service: "contacts",
              select: ["contactName"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Projects updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.debug("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Projects",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // on mount companies
    client
      .service("companies")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleCompaniesId,
        },
      })
      .then((res) => {
        setCompany(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Companies",
          type: "error",
          message: error.message || "Failed get companies",
        });
      });
  }, []);

  useEffect(() => {
    // on mount contacts
    client
      .service("contacts")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleContactsId,
        },
      })
      .then((res) => {
        setContact(
          res.data.map((e) => {
            return { name: e["contactName"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.debug({ error });
        props.alert({
          title: "Contacts",
          type: "error",
          message: error.message || "Failed get contacts",
        });
      });
  }, []);

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

  const companyOptions = company.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const contactOptions = contact.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Create Projects"
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
        role="projects-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="company">Company:</label>
            <Dropdown
              id="company"
              value={_entity?.company?._id}
              optionLabel="name"
              optionValue="value"
              options={companyOptions}
              onChange={(e) => setValByKey("company", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["company"]) ? (
              <p className="m-0" key="error-company">
                {error["company"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="contact">Contact:</label>
            <Dropdown
              id="contact"
              value={_entity?.contact?._id}
              optionLabel="name"
              optionValue="value"
              options={contactOptions}
              onChange={(e) => setValByKey("contact", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["contact"]) ? (
              <p className="m-0" key="error-contact">
                {error["contact"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="projectName">Project Name:</label>
            <InputText
              id="projectName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.projectName}
              onChange={(e) => setValByKey("projectName", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["projectName"]) ? (
              <p className="m-0" key="error-projectName">
                {error["projectName"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="idGAF">Id GAF:</label>
            <InputText
              id="idGAF"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.idGAF}
              onChange={(e) => setValByKey("idGAF", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["idGAF"]) ? (
              <p className="m-0" key="error-idGAF">
                {error["idGAF"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="title">Title:</label>
            <InputText
              id="title"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.title}
              onChange={(e) => setValByKey("title", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["title"]) ? (
              <p className="m-0" key="error-title">
                {error["title"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="problemStatement">Problem Statement:</label>
            <InputText
              id="problemStatement"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.problemStatement}
              onChange={(e) => setValByKey("problemStatement", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["problemStatement"]) ? (
              <p className="m-0" key="error-problemStatement">
                {error["problemStatement"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="relevantAITechnologies">
              Relevant AI Technologies:
            </label>
            <InputText
              id="relevantAITechnologies"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.relevantAITechnologies}
              onChange={(e) =>
                setValByKey("relevantAITechnologies", e.target.value)
              }
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["relevantAITechnologies"]) ? (
              <p className="m-0" key="error-relevantAITechnologies">
                {error["relevantAITechnologies"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="expectedOutcomes">
              Expected Outcomes / Success Me:
            </label>
            <InputText
              id="expectedOutcomes"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.expectedOutcomes}
              onChange={(e) => setValByKey("expectedOutcomes", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["expectedOutcomes"]) ? (
              <p className="m-0" key="error-expectedOutcomes">
                {error["expectedOutcomes"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="currentSolutions">Current Solutions:</label>
            <InputText
              id="currentSolutions"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.currentSolutions}
              onChange={(e) => setValByKey("currentSolutions", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["currentSolutions"]) ? (
              <p className="m-0" key="error-currentSolutions">
                {error["currentSolutions"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="targetUsers">Target Users:</label>
            <InputText
              id="targetUsers"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.targetUsers}
              onChange={(e) => setValByKey("targetUsers", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["targetUsers"]) ? (
              <p className="m-0" key="error-targetUsers">
                {error["targetUsers"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="dataAvailability">
              Data Availability & Readiness:
            </label>
            <InputText
              id="dataAvailability"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.dataAvailability}
              onChange={(e) => setValByKey("dataAvailability", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["dataAvailability"]) ? (
              <p className="m-0" key="error-dataAvailability">
                {error["dataAvailability"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="requirements">
              Integration Deploy Requirement:
            </label>
            <InputText
              id="requirements"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.requirements}
              onChange={(e) => setValByKey("requirements", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["requirements"]) ? (
              <p className="m-0" key="error-requirements">
                {error["requirements"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="budgetAllocation">Budget Allocation:</label>
            <InputText
              id="budgetAllocation"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.budgetAllocation}
              onChange={(e) => setValByKey("budgetAllocation", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["budgetAllocation"]) ? (
              <p className="m-0" key="error-budgetAllocation">
                {error["budgetAllocation"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="referredCollaborationTimeline">
              Referred Collaboration Timeline:
            </label>
            <InputText
              id="referredCollaborationTimeline"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.referredCollaborationTimeline}
              onChange={(e) =>
                setValByKey("referredCollaborationTimeline", e.target.value)
              }
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["referredCollaborationTimeline"]) ? (
              <p className="m-0" key="error-referredCollaborationTimeline">
                {error["referredCollaborationTimeline"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="tags">Tags:</label>
            <Chips
              id="tags"
              className="w-full mb-3"
              value={_entity?.tags}
              onChange={(e) => setValByKey("tags", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["tags"]) ? (
              <p className="m-0" key="error-tags">
                {error["tags"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="founded">Founded:</label>
            <InputText
              id="founded"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.founded}
              onChange={(e) => setValByKey("founded", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["founded"]) ? (
              <p className="m-0" key="error-founded">
                {error["founded"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="headquarters">Headquarters:</label>
            <InputText
              id="headquarters"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.headquarters}
              onChange={(e) => setValByKey("headquarters", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["headquarters"]) ? (
              <p className="m-0" key="error-headquarters">
                {error["headquarters"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="deadline">Deadline:</label>
            <InputText
              id="deadline"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.deadline}
              onChange={(e) => setValByKey("deadline", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["deadline"]) ? (
              <p className="m-0" key="error-deadline">
                {error["deadline"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="daysRemaining">Days Remaining:</label>
            <InputText
              id="daysRemaining"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.daysRemaining}
              onChange={(e) => setValByKey("daysRemaining", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["daysRemaining"]) ? (
              <p className="m-0" key="error-daysRemaining">
                {error["daysRemaining"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="budget">Budget:</label>
            <InputText
              id="budget"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.budget}
              onChange={(e) => setValByKey("budget", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["budget"]) ? (
              <p className="m-0" key="error-budget">
                {error["budget"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="category">Category:</label>
            <InputText
              id="category"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.category}
              onChange={(e) => setValByKey("category", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["category"]) ? (
              <p className="m-0" key="error-category">
                {error["category"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="enterprise">Enterprise:</label>
            <InputText
              id="enterprise"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.enterprise}
              onChange={(e) => setValByKey("enterprise", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["enterprise"]) ? (
              <p className="m-0" key="error-enterprise">
                {error["enterprise"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="posted">Posted:</label>
            <InputText
              id="posted"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.posted}
              onChange={(e) => setValByKey("posted", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["posted"]) ? (
              <p className="m-0" key="error-posted">
                {error["posted"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="others">Others:</label>
            <InputText
              id="others"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.others}
              onChange={(e) => setValByKey("others", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["others"]) ? (
              <p className="m-0" key="error-others">
                {error["others"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="path">Path:</label>
            <InputText
              id="path"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.path}
              onChange={(e) => setValByKey("path", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["path"]) ? (
              <p className="m-0" key="error-path">
                {error["path"]}
              </p>
            ) : null}
          </small>
        </div>
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

export default connect(mapState, mapDispatch)(ProjectsCreateDialogComponent);
