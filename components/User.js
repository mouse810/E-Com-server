import { request, response } from "express";
import UserModel from "../models/user.js";

export const Register = async (request, response) => {
     try {
          const user = await UserModel.findOne({
               email: request.user.email
          })
          if (user) {
               response.status(404).send({ message: "User already Exist with this Email" })
               return;
          }

          let userInformation = await UserModel.create({
               ...request.body,
               profilePicture: request?.file?.fileName
          })
          if (userInformation) response.status(201).send({ message: "User Created" });
          else response.status(404).sent({ message: "Unable to create User" });
     }
     catch (event) {
          response.status(404).send({ error: event?.message })
     }
}

export const login = async (request, response) => {
     try {
          const user = await UserModel.findOne({
               email: request.body.email,
               password: request.body.password
          })
          if (user) response.status(200).send({ id: user._id, role: user.role })
          else response.status(404).send({ message: "Wrong User/Password" })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
}