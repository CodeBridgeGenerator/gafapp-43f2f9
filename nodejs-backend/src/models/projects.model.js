module.exports = function (app) {
  const modelName = "projects";
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
      contact: {
        type: Schema.Types.ObjectId,
        ref: "contacts",
        comment:
          "Contact, dropdown, false, true, true, true, true, true, true, contacts, contacts, one-to-one, contactName,",
      },
      projectName: {
        type: String,
        comment:
          "Project Name, p, false, true, true, true, true, true, true, , , , ,",
      },
      idGAF: {
        type: String,
        comment:
          "Id GAF, p, false, true, true, true, true, true, true, , , , ,",
      },
      title: {
        type: String,
        comment: "Title, p, false, true, true, true, true, true, true, , , , ,",
      },
      problemStatement: {
        type: [String],
        comment:
          "Problem Statement, p, false, true, true, true, true, true, true, , , , ,",
      },
      relevantAITechnologies: {
        type: [String],
        comment:
          "Relevant AI Technologies, p, false, true, true, true, true, true, true, , , , ,",
      },
      expectedOutcomes: {
        type: [String],
        comment:
          "Expected Outcomes / Success Me, p, false, true, true, true, true, true, true, , , , ,",
      },
      currentSolutions: {
        type: [String],
        comment:
          "Current Solutions, p, false, true, true, true, true, true, true, , , , ,",
      },
      targetUsers: {
        type: [String],
        comment:
          "Target Users, p, false, true, true, true, true, true, true, , , , ,",
      },
      dataAvailability: {
        type: [String],
        comment:
          "Data Availability & Readiness, p, false, true, true, true, true, true, true, , , , ,",
      },
      requirements: {
        type: [String],
        comment:
          "Integration Deploy Requirement, p, false, true, true, true, true, true, true, , , , ,",
      },
      budgetAllocation: {
        type: [String],
        comment:
          "Budget Allocation, p, false, true, true, true, true, true, true, , , , ,",
      },
      referredCollaborationTimeline: {
        type: [String],
        comment:
          "Referred Collaboration Timeline, p, false, true, true, true, true, true, true, , , , ,",
      },
      tags: {
        type: [String],
        description: "isArray",
        comment:
          "Tags, chip, false, true, true, true, true, true, true, , , , ,",
      },
      founded: {
        type: String,

        comment:
          "Founded, p, false, true, true, true, true, true, true, , , , ,",
      },
      headquarters: {
        type: String,
        comment:
          "Headquarters, p, false, true, true, true, true, true, true, , , , ,",
      },
      deadline: {
        type: String,
        comment:
          "Deadline, p, false, true, true, true, true, true, true, , , , ,",
      },
      daysRemaining: {
        type: String,
        comment:
          "Days Remaining, p, false, true, true, true, true, true, true, , , , ,",
      },
      budget: {
        type: String,
        comment:
          "Budget, p, false, true, true, true, true, true, true, , , , ,",
      },
      category: {
        type: String,
        comment:
          "Category, p, false, true, true, true, true, true, true, , , , ,",
      },
      enterprise: {
        type: String,
        comment:
          "Enterprise, p, false, true, true, true, true, true, true, , , , ,",
      },
      posted: {
        type: String,
        comment:
          "Posted, p, false, true, true, true, true, true, true, , , , ,",
      },
      others: {
        type: [String],
        description: "isArray",
        comment:
          "Others, p, false, true, true, true, true, true, true, , , , ,",
      },
      path: {
        type: String,
        comment: "Path, p, false, true, true, true, true, true, true, , , , ,",
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "users" },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users" },
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
