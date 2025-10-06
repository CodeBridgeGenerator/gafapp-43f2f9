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

import ProjectProposalsPage from "../ProjectProposalsPage/ProjectProposalsPage";
import UploadFilesToS3 from "../../../services/UploadFilesToS3";

const SingleProposalsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [projectName, setProjectName] = useState([]);
const [approvedBy, setApprovedBy] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("proposals")
            .get(urlParams.singleProposalsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"projectName","approvedBy"] }})
            .then((res) => {
                set_entity(res || {});
                const projectName = Array.isArray(res.projectName)
            ? res.projectName.map((elem) => ({ _id: elem._id, projectName: elem.projectName }))
            : res.projectName
                ? [{ _id: res.projectName._id, projectName: res.projectName.projectName }]
                : [];
        setProjectName(projectName);
const approvedBy = Array.isArray(res.approvedBy)
            ? res.approvedBy.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.approvedBy
                ? [{ _id: res.approvedBy._id, name: res.approvedBy.name }]
                : [];
        setApprovedBy(approvedBy);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Proposals", type: "error", message: error.message || "Failed get proposals" });
            });
    }, [props,urlParams.singleProposalsId]);


    const goBack = () => {
        navigate("/proposals");
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
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Proposals</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>proposals/{urlParams.singleProposalsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Proposal Ref</label><p className="m-0 ml-3" >{_entity?.proposalRef}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Proposal Name</label><p className="m-0 ml-3" >{_entity?.proposalName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Due Date</label><p id="dueDate" className="m-0 ml-3" >{_entity?.dueDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Approved</label><p className="m-0" ><i id="approved" className={`pi ${_entity?.approved?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Remarks</label><p className="m-0 ml-3" >{_entity?.remarks}</p></div>
<div className="col-12"><label className="text-sm text-gray-600">File</label><div className="m-0 ml-3" ><UploadFilesToS3 type={'single'}/></div></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project Name</label>
                    {projectName.map((elem) => (
                        <Link key={elem._id} to={`/projects/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.projectName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Approved By</label>
                    {approvedBy.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="undefined" leftIcon="pi pi-building-columns mr-2">
                        <ProjectProposalsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleProposalsId}
        user={props.user}
        alert={props.alert}
        serviceName="proposals"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
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

export default connect(mapState, mapDispatch)(SingleProposalsPage);
