module.exports = function (app) {
  const modelName = "project_proposals";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      proposalRef: {
        type: Schema.Types.ObjectId,
        ref: "proposals",
        comment:
          "Proposal Reference, dropdown, false, true, true, true, true, true, true, proposals, proposals, one-to-one, proposalRef,",
      },
      quotation: {
        type: Schema.Types.ObjectId,
        ref: "quotes",
        comment:
          "Quotation, dropdown, false, true, true, true, true, true, true, quotes, quotes, one-to-one, quoteNo,",
      },
      approved: {
        type: Boolean,
        required: false,
        comment:
          "Approved, p_boolean, false, true, true, true, true, true, true, , , , ,",
      },
      approvedDate: {
        type: Date,
        comment:
          "Approved Date, p_date, false, true, true, true, true, true, true, , , , ,",
      },
      approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        comment:
          "Approved By, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name,",
      },
      rejected: {
        type: Boolean,
        required: false,
        comment:
          "Rejected, tick, false, true, true, true, true, true, true, , , , ,",
      },
      remarks: {
        type: String,
        comment:
          "Remarks, inputTextarea, false, true, true, true, true, true, true, , , , ,",
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
