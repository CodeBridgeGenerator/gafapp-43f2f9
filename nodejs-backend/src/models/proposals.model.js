module.exports = function (app) {
  const modelName = "proposals";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      proposalRef: {
        type: String,
        required: true,
        comment:
          "Proposal Ref, p, false, true, true, true, true, true, true, , , , ,",
      },
      proposalName: {
        type: String,
        required: true,
        comment:
          "Proposal Name, p, false, true, true, true, true, true, true, , , , ,",
      },
      projectName: {
        type: Schema.Types.ObjectId,
        ref: "projects",
        comment:
          "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName,",
      },
      dueDate: {
        type: Date,
        comment:
          "Due Date, p_calendar, false, true, true, true, true, true, true, , , , ,",
      },
      approved: {
        type: Boolean,
        required: false,
        comment:
          "Approved, tick, false, true, true, true, true, true, true, , , , ,",
      },
      approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        comment:
          "Approved By, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name,",
      },
      remarks: {
        type: String,
        required: true,
        comment:
          "Remarks, inputTextarea, false, true, true, true, true, true, true, , , , ,",
      },
      file: {
        type: [Schema.Types.ObjectId],
        ref: "document_storages",
        required: true,
        comment:
          "File, file_upload, false, true, true, true, true, true, true, , , , ,",
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
