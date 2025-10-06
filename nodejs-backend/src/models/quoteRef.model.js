
    module.exports = function (app) {
        const modelName = "quote_ref";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
abbr: { type:  String , required: true, comment: "Abbr, p, false, true, true, true, true, true, true, , , , ," },
type: { type: String , enum: ["App","Training","Others"], comment: "Type, dropdownArray, false, true, true, true, true, true, true, , , , ," },
prefix: { type:  String , required: true, comment: "Prefix, p, false, true, true, true, true, true, true, , , , ," },
number: { type: Number, max: 10000000, comment: "Number, p_number, false, true, true, true, true, true, true, , , , ," },
suffix: { type: Number, max: 10000000, default: 2025, comment: "Suffix, p_number, false, true, true, true, true, true, true, , , , ," },

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