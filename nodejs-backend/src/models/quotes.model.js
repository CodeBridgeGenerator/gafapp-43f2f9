
    module.exports = function (app) {
        const modelName = "quotes";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quoteNo: { type:  String , required: true, comment: "Quote No, p, false, true, true, true, true, true, true, , , , ," },
projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
applicationCost: { type: Number, max: 10000000, comment: "Application Cost, currency, false, true, true, true, true, true, true, , , , ," },
supportCost: { type: Number, max: 10000000, comment: "Support Cost, currency, false, true, true, true, true, true, true, , , , ," },
firstMilestonePayment: { type: Number, max: 1000000, comment: "First Milestone Payment, currency, false, true, true, true, true, true, true, , , , ," },
secondMilestonePayment: { type: Number, max: 1000000, comment: "Second Milestone Payment, currency, false, true, true, true, true, true, true, , , , ," },
thirdMilestonePayment: { type: Number, max: 1000000, comment: "Third Milestone Payment, currency, false, true, true, true, true, true, true, , , , ," },
fourthMilestonePayment: { type: Number, max: 1000000, comment: "Fourth Milestone Payment, currency, false, true, true, true, true, true, true, , , , ," },
fifthMilestonePayment: { type: Number, max: 1000000, comment: "Fifth Milestone Payment, currency, false, true, true, true, true, true, true, , , , ," },
applicationCostSST: { type: Number, max: 1000000, comment: "Application Cost SST, currency, false, true, true, true, true, true, true, , , , ," },
supportCostSST: { type: Number, max: 1000000, comment: "Support Cost SST, currency, false, true, true, true, true, true, true, , , , ," },
revision: { type: Number, max: 1000000, comment: "Revision, p_number, false, true, true, true, true, true, true, , , , ," },
approved: { type: Boolean, required: false, comment: "Approved, tick, false, true, true, true, true, true, true, , , , ," },
approvedBy: { type: Schema.Types.ObjectId, ref: "users", comment: "Approved By, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
file: { type:  [Schema.Types.ObjectId], ref: "document_storages" , required: true, comment: "File, file_upload, false, true, true, true, true, true, true, , , , ," },

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