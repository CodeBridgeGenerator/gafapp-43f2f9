
    module.exports = function (app) {
        const modelName = "projects";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            company: { type: Schema.Types.ObjectId, ref: "companies", comment: "Company, dropdown, false, true, true, true, true, true, true, companies, companies, one-to-one, name," },
contact: { type: Schema.Types.ObjectId, ref: "contacts", comment: "Contact, dropdown, false, true, true, true, true, true, true, contacts, contacts, one-to-one, contactName," },
projectName: { type:  String , required: true, comment: "Project Name, p, false, true, true, true, true, true, true, , , , ," },
idGAF: { type:  String , required: true, comment: "Id GAF, p, false, true, true, true, true, true, true, , , , ," },
title: { type:  String , required: true, comment: "Title, p, false, true, true, true, true, true, true, , , , ," },
problemStatement: { type:  String , required: true, comment: "Problem Statement, p, false, true, true, true, true, true, true, , , , ," },
relevantAITechnologies: { type:  String , required: true, comment: "Relevant AI Technologies, p, false, true, true, true, true, true, true, , , , ," },
expectedOutcomes: { type:  String , required: true, comment: "Expected Outcomes / Success Me, p, false, true, true, true, true, true, true, , , , ," },
currentSolutions: { type:  String , required: true, comment: "Current Solutions, p, false, true, true, true, true, true, true, , , , ," },
targetUsers: { type:  String , required: true, comment: "Target Users, p, false, true, true, true, true, true, true, , , , ," },
dataAvailability: { type:  String , required: true, comment: "Data Availability & Readiness, p, false, true, true, true, true, true, true, , , , ," },
requirements: { type:  String , required: true, comment: "Integration Deploy Requirement, p, false, true, true, true, true, true, true, , , , ," },
budgetAllocation: { type:  String , required: true, comment: "Budget Allocation, p, false, true, true, true, true, true, true, , , , ," },
referredCollaborationTimeline: { type:  String , required: true, comment: "Referred Collaboration Timeline, p, false, true, true, true, true, true, true, , , , ," },
tags: { type: [String] , required: true, description: "isArray", comment: "Tags, chip, false, true, true, true, true, true, true, , , , ," },
founded: { type:  String , required: true, comment: "Founded, p, false, true, true, true, true, true, true, , , , ," },
headquarters: { type:  String , required: true, comment: "Headquarters, p, false, true, true, true, true, true, true, , , , ," },
deadline: { type:  String , required: true, comment: "Deadline, p, false, true, true, true, true, true, true, , , , ," },
daysRemaining: { type:  String , required: true, comment: "Days Remaining, p, false, true, true, true, true, true, true, , , , ," },
budget: { type:  String , required: true, comment: "Budget, p, false, true, true, true, true, true, true, , , , ," },
category: { type:  String , required: true, comment: "Category, p, false, true, true, true, true, true, true, , , , ," },
enterprise: { type:  String , required: true, comment: "Enterprise, p, false, true, true, true, true, true, true, , , , ," },
posted: { type:  String , required: true, comment: "Posted, p, false, true, true, true, true, true, true, , , , ," },
others: { type:  [String] , required: true, description: "isArray", comment: "Others, p, false, true, true, true, true, true, true, , , , ," },
path: { type:  String , required: true, comment: "Path, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };