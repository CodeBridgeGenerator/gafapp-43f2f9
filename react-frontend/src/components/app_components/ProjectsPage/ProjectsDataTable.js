import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const ProjectsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.company?.name}</p>
const dropdownTemplate1 = (rowData, { rowIndex }) => <p >{rowData.contact?.contactName}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.projectName}</p>
const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.idGAF}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.title}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.problemStatement}</p>
const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.relevantAITechnologies}</p>
const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.expectedOutcomes}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.currentSolutions}</p>
const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.targetUsers}</p>
const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.dataAvailability}</p>
const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.requirements}</p>
const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.budgetAllocation}</p>
const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.referredCollaborationTimeline}</p>
const chipTemplate14 = (rowData, { rowIndex }) => <Chip label={rowData.tags}  />
const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.founded}</p>
const pTemplate16 = (rowData, { rowIndex }) => <p >{rowData.headquarters}</p>
const pTemplate17 = (rowData, { rowIndex }) => <p >{rowData.deadline}</p>
const pTemplate18 = (rowData, { rowIndex }) => <p >{rowData.daysRemaining}</p>
const pTemplate19 = (rowData, { rowIndex }) => <p >{rowData.budget}</p>
const pTemplate20 = (rowData, { rowIndex }) => <p >{rowData.category}</p>
const pTemplate21 = (rowData, { rowIndex }) => <p >{rowData.enterprise}</p>
const pTemplate22 = (rowData, { rowIndex }) => <p >{rowData.posted}</p>
const pTemplate23 = (rowData, { rowIndex }) => <p >{rowData.others}</p>
const pTemplate24 = (rowData, { rowIndex }) => <p >{rowData.path}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="company" header="Company" body={dropdownTemplate0} filter={selectedFilterFields.includes("company")} hidden={selectedHideFields?.includes("company")}  style={{ minWidth: "8rem" }} />
<Column field="contact" header="Contact" body={dropdownTemplate1} filter={selectedFilterFields.includes("contact")} hidden={selectedHideFields?.includes("contact")}  style={{ minWidth: "8rem" }} />
<Column field="projectName" header="Project Name" body={pTemplate2} filter={selectedFilterFields.includes("projectName")} hidden={selectedHideFields?.includes("projectName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="idGAF" header="Id GAF" body={pTemplate3} filter={selectedFilterFields.includes("idGAF")} hidden={selectedHideFields?.includes("idGAF")}  sortable style={{ minWidth: "8rem" }} />
<Column field="title" header="Title" body={pTemplate4} filter={selectedFilterFields.includes("title")} hidden={selectedHideFields?.includes("title")}  sortable style={{ minWidth: "8rem" }} />
<Column field="problemStatement" header="Problem Statement" body={pTemplate5} filter={selectedFilterFields.includes("problemStatement")} hidden={selectedHideFields?.includes("problemStatement")}  sortable style={{ minWidth: "8rem" }} />
<Column field="relevantAITechnologies" header="Relevant AI Technologies" body={pTemplate6} filter={selectedFilterFields.includes("relevantAITechnologies")} hidden={selectedHideFields?.includes("relevantAITechnologies")}  sortable style={{ minWidth: "8rem" }} />
<Column field="expectedOutcomes" header="Expected Outcomes / Success Me" body={pTemplate7} filter={selectedFilterFields.includes("expectedOutcomes")} hidden={selectedHideFields?.includes("expectedOutcomes")}  sortable style={{ minWidth: "8rem" }} />
<Column field="currentSolutions" header="Current Solutions" body={pTemplate8} filter={selectedFilterFields.includes("currentSolutions")} hidden={selectedHideFields?.includes("currentSolutions")}  sortable style={{ minWidth: "8rem" }} />
<Column field="targetUsers" header="Target Users" body={pTemplate9} filter={selectedFilterFields.includes("targetUsers")} hidden={selectedHideFields?.includes("targetUsers")}  sortable style={{ minWidth: "8rem" }} />
<Column field="dataAvailability" header="Data Availability & Readiness" body={pTemplate10} filter={selectedFilterFields.includes("dataAvailability")} hidden={selectedHideFields?.includes("dataAvailability")}  sortable style={{ minWidth: "8rem" }} />
<Column field="requirements" header="Integration Deploy Requirement" body={pTemplate11} filter={selectedFilterFields.includes("requirements")} hidden={selectedHideFields?.includes("requirements")}  sortable style={{ minWidth: "8rem" }} />
<Column field="budgetAllocation" header="Budget Allocation" body={pTemplate12} filter={selectedFilterFields.includes("budgetAllocation")} hidden={selectedHideFields?.includes("budgetAllocation")}  sortable style={{ minWidth: "8rem" }} />
<Column field="referredCollaborationTimeline" header="Referred Collaboration Timeline" body={pTemplate13} filter={selectedFilterFields.includes("referredCollaborationTimeline")} hidden={selectedHideFields?.includes("referredCollaborationTimeline")}  sortable style={{ minWidth: "8rem" }} />
<Column field="tags" header="Tags" body={chipTemplate14} filter={selectedFilterFields.includes("tags")} hidden={selectedHideFields?.includes("tags")}  sortable style={{ minWidth: "8rem" }} />
<Column field="founded" header="Founded" body={pTemplate15} filter={selectedFilterFields.includes("founded")} hidden={selectedHideFields?.includes("founded")}  sortable style={{ minWidth: "8rem" }} />
<Column field="headquarters" header="Headquarters" body={pTemplate16} filter={selectedFilterFields.includes("headquarters")} hidden={selectedHideFields?.includes("headquarters")}  sortable style={{ minWidth: "8rem" }} />
<Column field="deadline" header="Deadline" body={pTemplate17} filter={selectedFilterFields.includes("deadline")} hidden={selectedHideFields?.includes("deadline")}  sortable style={{ minWidth: "8rem" }} />
<Column field="daysRemaining" header="Days Remaining" body={pTemplate18} filter={selectedFilterFields.includes("daysRemaining")} hidden={selectedHideFields?.includes("daysRemaining")}  sortable style={{ minWidth: "8rem" }} />
<Column field="budget" header="Budget" body={pTemplate19} filter={selectedFilterFields.includes("budget")} hidden={selectedHideFields?.includes("budget")}  sortable style={{ minWidth: "8rem" }} />
<Column field="category" header="Category" body={pTemplate20} filter={selectedFilterFields.includes("category")} hidden={selectedHideFields?.includes("category")}  sortable style={{ minWidth: "8rem" }} />
<Column field="enterprise" header="Enterprise" body={pTemplate21} filter={selectedFilterFields.includes("enterprise")} hidden={selectedHideFields?.includes("enterprise")}  sortable style={{ minWidth: "8rem" }} />
<Column field="posted" header="Posted" body={pTemplate22} filter={selectedFilterFields.includes("posted")} hidden={selectedHideFields?.includes("posted")}  sortable style={{ minWidth: "8rem" }} />
<Column field="others" header="Others" body={pTemplate23} filter={selectedFilterFields.includes("others")} hidden={selectedHideFields?.includes("others")}  sortable style={{ minWidth: "8rem" }} />
<Column field="path" header="Path" body={pTemplate24} filter={selectedFilterFields.includes("path")} hidden={selectedHideFields?.includes("path")}  sortable style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload Projects Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="projects"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Projects" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ProjectsDataTable;