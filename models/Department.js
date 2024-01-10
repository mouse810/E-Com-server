import mongoose, { Schema } from "mongoose";

const DepartmentSchema = new mongoose.Schema({
     name: {
          type: String,
          require: true
     }, image: {
          type: String,
          require: true
     }, university: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'University',
          require: true
     }
}, {
     timestamps: true
}
)

const DepartmentModel = mongoose.model('DepartmentSchema');

export default DepartmentModel;