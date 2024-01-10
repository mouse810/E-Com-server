import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema({
     name: {
          type: String,
          require: true
     }, Image: {
          type: String,
         // require: true
     }
},
     {
          timestamps: true
     }
)

const UniversityModels = mongoose.model('University', UniversitySchema);

export default UniversityModels;