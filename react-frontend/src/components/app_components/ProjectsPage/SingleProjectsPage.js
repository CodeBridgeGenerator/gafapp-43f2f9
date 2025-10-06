import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import ProposalsPage from "../ProposalsPage/ProposalsPage";
import QuotesPage from "../QuotesPage/QuotesPage";
import { Chip } from "primereact/chip";

const SingleProjectsPage = (props) => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

  const [company, setCompany] = useState([]);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    //on mount
    client
      .service("projects")
      .get(urlParams.singleProjectsId, {
        query: {
          $populate: [
            {
              path: "createdBy",
              service: "users",
              select: ["name"],
            },
            {
              path: "updatedBy",
              service: "users",
              select: ["name"],
            },
            "company",
            "contact",
          ],
        },
      })
      .then((res) => {
        set_entity(res || {});
        const company = Array.isArray(res.company)
          ? res.company.map((elem) => ({ _id: elem._id, name: elem.name }))
          : res.company
            ? [{ _id: res.company._id, name: res.company.name }]
            : [];
        setCompany(company);
        const contact = Array.isArray(res.contact)
          ? res.contact.map((elem) => ({
              _id: elem._id,
              contactName: elem.contactName,
            }))
          : res.contact
            ? [{ _id: res.contact._id, contactName: res.contact.contactName }]
            : [];
        setContact(contact);
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Projects",
          type: "error",
          message: error.message || "Failed get projects",
        });
      });
  }, [props, urlParams.singleProjectsId]);

  const goBack = () => {
    navigate("/projects");
  };

  const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

  const menuItems = [
    {
      label: "Copy link",
      icon: "pi pi-copy",
      command: () => copyPageLink(),
    },
    {
      label: "Help",
      icon: "pi pi-question-circle",
      command: () => toggleHelpSidebar(),
    },
  ];

  return (
    <ProjectLayout>
      <div className="col-12 flex flex-column align-items-center">
        <div className="col-12">
          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center">
              <Button
                className="p-button-text"
                icon="pi pi-chevron-left"
                onClick={() => goBack()}
              />
              <h3 className="m-0">Projects</h3>
              <SplitButton
                model={menuItems.filter(
                  (m) => !(m.icon === "pi pi-trash" && items?.length === 0)
                )}
                dropdownIcon="pi pi-ellipsis-h"
                buttonClassName="hidden"
                menuButtonClassName="ml-1 p-button-text"
              />
            </div>

            {/* <p>projects/{urlParams.singleProjectsId}</p> */}
          </div>
          <div className="card w-full">
            <div className="grid ">
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Project Name</label>
                <p className="m-0 ml-3">{_entity?.projectName}</p>
              </div>

              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Title</label>
                <p className="m-0 ml-3">{_entity?.title}</p>
              </div>
              <div className="col-12">
                <label className="text-sm text-gray-600">
                  Problem Statement
                </label>
                <p
                  className="m-0 ml-3"
                  dangerouslySetInnerHTML={{
                    __html: _entity?.problemStatement,
                  }}
                ></p>
              </div>
              <div className="col-12">
                <label className="text-sm text-gray-600">
                  Relevant AI Technologies
                </label>
                <p className="m-0 ml-3">{_entity?.relevantAITechnologies}</p>
              </div>
              <div className="col-12">
                <label className="text-sm text-gray-600">
                  Expected Outcomes / Success Me
                </label>
                <p className="m-0 ml-3">{_entity?.expectedOutcomes}</p>
              </div>
              <div className="col-12">
                <label className="text-sm text-gray-600">
                  Current Solutions
                </label>
                <p className="m-0 ml-3">{_entity?.currentSolutions}</p>
              </div>
              <div className="col-12 ">
                <label className="text-sm text-gray-600">Target Users</label>
                <p className="m-0 ml-3">{_entity?.targetUsers}</p>
              </div>
              <div className="col-12 ">
                <label className="text-sm text-gray-600">
                  Data Availability & Readiness
                </label>
                <p className="m-0 ml-3">{_entity?.dataAvailability}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Integration Deploy Requirement
                </label>
                <p className="m-0 ml-3">{_entity?.requirements}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Budget Allocation
                </label>
                <p className="m-0 ml-3">{_entity?.budgetAllocation}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">
                  Referred Collaboration Timeline
                </label>
                <p className="m-0 ml-3">
                  {_entity?.referredCollaborationTimeline}
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Tags</label>
                <p className="m-0 ml-3">
                  <Chip id="tags" label={_entity?.tags} />
                </p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Founded</label>
                <p className="m-0 ml-3">{_entity?.founded}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Headquarters</label>
                <p className="m-0 ml-3">{_entity?.headquarters}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Deadline</label>
                <p className="m-0 ml-3">{_entity?.deadline}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Days Remaining</label>
                <p className="m-0 ml-3">{_entity?.daysRemaining}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Budget</label>
                <p className="m-0 ml-3">{_entity?.budget}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Category</label>
                <p className="m-0 ml-3">{_entity?.category}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Enterprise</label>
                <p className="m-0 ml-3">{_entity?.enterprise}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Posted</label>
                <p className="m-0 ml-3">{_entity?.posted}</p>
              </div>
              <div className="col-12">
                <label className="text-sm text-gray-600">Others</label>
                <p
                  className="m-0 ml-3"
                  dangerouslySetInnerHTML={{
                    __html: _entity?.others?.join(", "),
                  }}
                ></p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Path</label>
                <p className="m-0 ml-3">{_entity?.path}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Company</label>
                {company.map((elem) => (
                  <Link key={elem._id} to={`/companies/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Id GAF</label>
                <p className="m-0 ml-3">{_entity?.idGAF}</p>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-gray-600">Contact</label>
                {contact.map((elem) => (
                  <Link key={elem._id} to={`/contacts/${elem._id}`}>
                    <div>
                      {" "}
                      <p className="text-xl text-primary">{elem.contactName}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="col-12">&nbsp;</div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-2">
          <TabView>
            <TabPanel header="Proposals" leftIcon="pi pi-building-columns mr-2">
              <ProposalsPage />
            </TabPanel>

            <TabPanel header="Quotes" leftIcon="pi pi-building-columns mr-2">
              <QuotesPage />
            </TabPanel>
          </TabView>
        </div>

        <CommentsSection
          recordId={urlParams.singleProjectsId}
          user={props.user}
          alert={props.alert}
          serviceName="projects"
        />
        <div
          id="rightsidebar"
          className={classNames(
            "overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out",
            { hidden: !isHelpSidebarVisible }
          )}
          style={{ top: "60px", height: "calc(100% - 60px)" }}
        >
          <div className="flex flex-column h-full p-4">
            <span className="text-xl font-medium text-900 mb-3">Help bar</span>
            <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
          </div>
        </div>
      </div>
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleProjectsPage);
