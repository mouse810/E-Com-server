import mongoose, { get } from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import express, { request } from "express";
// import UniversityModels from "../models/University.js";
import multer from "multer";
import { CreateUniversity, GetUniversity, DeleteUniversity, UpdateUniversity } from "./components/university.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentsByUniversityById, UpdateDepartment } from "./components/Department.js";
import { CreateProduct, DeleteProduct, UpdateProduct, productByDepartmentId, productDetails, updateProductQuantity }
     from "./components/Product.js";
import { Register, login } from "./components/User.js";
// import { CreateProduct, DeleteProduct, UpdateProduct } from "./components/Product.js";

dotenv.config();

var app = express();
app.use(express.json());
app.use(cors());

// UniversityModels

const storageUniversity = multer.diskStorage({
     destination: "uploadUniversity/",
     filename: (request, file, cb) => {
          cb(null, `${Date.now()}--${file.originalname}`);
     }
});
const uploadUniversity = multer({
     storage: storageUniversity,
})


app.post('/university', uploadUniversity.single('image'), CreateUniversity)
app.put('/university', uploadUniversity.single('image'), UpdateUniversity)
app.delete('/university', DeleteUniversity)
app.get('/university', GetUniversity)

// Department Module

const storageDepartment = multer.diskStorage({
     destination: "Upload Department",
     filename: (request, file, cb) => {
          cb(null, `${Date.now()}--${file.originalname}`)
     }
})
const uploadDepartment = multer({
     storage: storageDepartment
})

app.post("/department", uploadDepartment.single("image"), CreateDepartment)
app.put("/department", uploadDepartment.single("image"), UpdateDepartment)
app.delete("/department", DeleteDepartment)
app.get("/department", GetDepartmentsByUniversityById)

// Product Module

const storageProduct = multer.diskStorage({
     destination: "Upload Product",
     filename: (request, file, cb) => {
          cb(null, `${Date.now()}--${file.originalname}`)
     }
})
const uploadProduct = multer({
     storage: storageProduct
})

app.post("/product", uploadProduct.array('image'), CreateProduct)
app.put("/product", uploadProduct.array('image'), UpdateProduct)
app.delete("/product", DeleteProduct)
app.get("/product", productByDepartmentId)
app.get("/detailsProduct", productDetails)
app.get("/updateProduct", updateProductQuantity)

// User

app.post("/register", Register)
app.post("/login", login)

mongoose.connect(process.env.DB_URL).then(() => {

     app.listen(process.env.PORT, () => {
          console.log(`Server Running at PORT: ${process.env.PORT}`);
     })
}).catch(() => {
     console.log('Data Connection error');
})