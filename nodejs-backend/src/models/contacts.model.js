module.exports = function (app) {
  const modelName = "contacts";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        comment:
          "Company, dropdown, false, true, true, true, true, true, true, companies, companies, one-to-one, name,",
      },
      contactName: {
        type: String,
        required: true,
        comment:
          "Contact Name, p, false, true, true, true, true, true, true, , , , ,",
      },
      position: {
        type: String,
        required: true,
        comment:
          "Position, p, false, true, true, true, true, true, true, , , , ,",
      },
      linkedIn: {
        type: String,
        required: true,
        comment:
          "LinkedIn, p, false, true, true, true, true, true, true, , , , ,",
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
