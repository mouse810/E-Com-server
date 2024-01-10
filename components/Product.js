import { request, response } from "express";
import ProductModel from "../models/Product.js";
import { populate } from "dotenv";


export const CreateProduct = async (request, response) => {
     try {
          let image = request?.files?.map((item) => {
               return item.fileName
          })
          const productData = await ProductModel.CreateProduct({
               name: request.body.name,
               description: request.body.description,
               quantity: request.body.quantity,
               price: request.body.price,
               image: image,
               department: request.body.department
          })
          if (productData) response.status(201).send({ message: "department Created" })
          else response.status(404).send({ message: "unable to create Department" })
     } catch (event) {
          request.status(404).send({ message: event?.message })
     }
}

export const UpdateProduct = async (request, response) => {
     try {
          let image = request?.files?.map((item) => {
               return item.fileName
          })
          const productData = await ProductModel.findByIdAndUpdate({ _id: request.body.id },
               {
                    name: request.body.name,
                    description: request.body.description,
                    quantity: request.body.quantity,
                    price: request.body.price,
                    image: image,
                    department: request.body.department
               })
          if (productData) response.status(201).send({ message: "department Created" })
          else response.status(404).send({ message: "unable to create Department" })
     } catch (event) {
          request.status(404).send({ message: event?.message })
     }
}

export const DeleteProduct = async (request, response) => {
     try {
          const productData = await ProductModel.deleteOne({ _id: request.body.id })
          if (productData.deletedCount == 1) response.status(200).send({ message: "Department Deleted" })
          else response.status(404).send({ message: "Unable to Delete Product" })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
}

//  Nested

export const productDetails = async (request, response) => {
     try {
          const productData = await ProductModel.findOne({ _id: request.query.id })
               .populate(
                    {
                         path: department,
                         populate: [{
                              path: "university"
                         }]
                    })
          request.status(200).send({ productData })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
}

export const productByDepartmentId = async (request, response) => {
     try {
          const productData = await ProductModel.find({
               department: request.query.departmentId
          }).populate({
               path: "Department",
               populate: [{
                    path: "university"
               }]
          })
          response.status(200).send({
               productData
          })
     } catch (event) {
          response.status(404).send({ error: event.message })
     }
}

export const updateProductQuantity = async (request, response) => {
     try {
          const productInDb = await ProductModel.findOne({
               _id: request.body.id
          })
          const active = true
          if (productInDb.quantity - request?.body?.quantity <= 0) {
               active = false
          }
          const productData = await ProductModel.findByIdUpdate({
               _id: request.body.id
          }, {
               active: active
          }, {
               quantity: productInDb?.quantity_request.body.quantity
          })
          if (productData) response.status(200).send({ message: "Product Quantity is Updated" })
          else response.status(404).send({ message: "Unable to Update Quantity" })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
}