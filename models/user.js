import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
     firstName: {
          type: String,
          require: true
     },
     lastName: {
          type: String,
          require: true
     }, email: {
          type: String,
          require: true
     }, password: {
          type: String,
          require: true
     }, profileImage: {
          type: String
     }, role: {
          type: String,
          default: true
     }
},
     { timestamps: true }
)

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
