import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";

import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const QuotesDataTable = ({
  items,
  fields,
  onEditRow,
  onRowDelete,
  onRowClick,
  searchDialog,
  setSearchDialog,
  showUpload,
  setShowUpload,
  showFilter,
  setShowFilter,
  showColumns,
  setShowColumns,
  onClickSaveFilteredfields,
  selectedFilterFields,
  setSelectedFilterFields,
  selectedHideFields,
  setSelectedHideFields,
  onClickSaveHiddenfields,
  loading,
  user,
  selectedDelete,
  setSelectedDelete,
  onCreateResult,
}) => {
  const dt = useRef(null);
  const urlParams = useParams();
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

  const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.quoteNo}</p>;
  const dropdownTemplate1 = (rowData, { rowIndex }) => (
    <p>{rowData.projectName?.projectName}</p>
  );
  const currencyTemplate2 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.applicationCost}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate3 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.supportCost}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate4 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.firstMilestonePayment}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate5 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.secondMilestonePayment}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate6 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.thirdMilestonePayment}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate7 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.fourthMilestonePayment}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate8 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.fifthMilestonePayment}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate9 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.applicationCostSST}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const currencyTemplate10 = (rowData, { rowIndex }) => (
    <InputNumber
      value={rowData.supportCostSST}
      mode="currency"
      currency="MYR"
      locale="en-US"
      disabled={true}
      useGrouping={false}
    />
  );
  const p_numberTemplate11 = (rowData, { rowIndex }) => (
    <p>{rowData.revision}</p>
  );
  const tickTemplate12 = (rowData, { rowIndex }) => (
    <i className={`pi ${rowData.approved ? "pi-check" : "pi-times"}`}></i>
  );
  const dropdownTemplate13 = (rowData, { rowIndex }) => (
    <p>{rowData.approvedBy?.name}</p>
  );
  const file_uploadTemplate14 = (rowData, { rowIndex }) => <div> </div>;
  const editTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onEditRow(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );
  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowData._id)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );

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
        <Column
          field="quoteNo"
          header="Quote No"
          body={pTemplate0}
          filter={selectedFilterFields.includes("quoteNo")}
          hidden={selectedHideFields?.includes("quoteNo")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="projectName"
          header="Project Name"
          body={dropdownTemplate1}
          filter={selectedFilterFields.includes("projectName")}
          hidden={selectedHideFields?.includes("projectName")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="applicationCost"
          header="Application Cost"
          body={currencyTemplate2}
          filter={selectedFilterFields.includes("applicationCost")}
          hidden={selectedHideFields?.includes("applicationCost")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="supportCost"
          header="Support Cost"
          body={currencyTemplate3}
          filter={selectedFilterFields.includes("supportCost")}
          hidden={selectedHideFields?.includes("supportCost")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="firstMilestonePayment"
          header="First Milestone Payment"
          body={currencyTemplate4}
          filter={selectedFilterFields.includes("firstMilestonePayment")}
          hidden={selectedHideFields?.includes("firstMilestonePayment")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="secondMilestonePayment"
          header="Second Milestone Payment"
          body={currencyTemplate5}
          filter={selectedFilterFields.includes("secondMilestonePayment")}
          hidden={selectedHideFields?.includes("secondMilestonePayment")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="thirdMilestonePayment"
          header="Third Milestone Payment"
          body={currencyTemplate6}
          filter={selectedFilterFields.includes("thirdMilestonePayment")}
          hidden={selectedHideFields?.includes("thirdMilestonePayment")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="fourthMilestonePayment"
          header="Fourth Milestone Payment"
          body={currencyTemplate7}
          filter={selectedFilterFields.includes("fourthMilestonePayment")}
          hidden={selectedHideFields?.includes("fourthMilestonePayment")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="fifthMilestonePayment"
          header="Fifth Milestone Payment"
          body={currencyTemplate8}
          filter={selectedFilterFields.includes("fifthMilestonePayment")}
          hidden={selectedHideFields?.includes("fifthMilestonePayment")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="applicationCostSST"
          header="Application Cost SST"
          body={currencyTemplate9}
          filter={selectedFilterFields.includes("applicationCostSST")}
          hidden={selectedHideFields?.includes("applicationCostSST")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="supportCostSST"
          header="Support Cost SST"
          body={currencyTemplate10}
          filter={selectedFilterFields.includes("supportCostSST")}
          hidden={selectedHideFields?.includes("supportCostSST")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="revision"
          header="Revision"
          body={p_numberTemplate11}
          filter={selectedFilterFields.includes("revision")}
          hidden={selectedHideFields?.includes("revision")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="approved"
          header="Approved"
          body={tickTemplate12}
          filter={selectedFilterFields.includes("approved")}
          hidden={selectedHideFields?.includes("approved")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="approvedBy"
          header="Approved By"
          body={dropdownTemplate13}
          filter={selectedFilterFields.includes("approvedBy")}
          hidden={selectedHideFields?.includes("approvedBy")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="file"
          header="File"
          body={file_uploadTemplate14}
          filter={selectedFilterFields.includes("file")}
          hidden={selectedHideFields?.includes("file")}
          sortable
          style={{ minWidth: "8rem" }}
        />
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

      <Dialog
        header="Upload Quotes Data"
        visible={showUpload}
        onHide={() => setShowUpload(false)}
      >
        <UploadService
          user={user}
          serviceName="quotes"
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}
        />
      </Dialog>

      <Dialog
        header="Search Quotes"
        visible={searchDialog}
        onHide={() => setSearchDialog(false)}
      >
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
            setShowFilter(false);
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
            setShowColumns(false);
          }}
        ></Button>
      </Dialog>
    </>
  );
};

export default QuotesDataTable;
