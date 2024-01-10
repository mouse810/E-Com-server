import UniversityModels from "../models/University.js"

export const CreateUniversity = async (request, response) => {
     try {
          const universityData = await UniversityModels.create({
               name: request.body.name,
               image: request?.file?.fileName
          });
          if (universityData) response.status(201).send({
               message: 'University Created'
          });
          else
               response.status(404).send({
                    message: 'Unable to Create University'
               })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
};
export const UpdateUniversity = async (request, response) => {
     try {
          const universityData = await UniversityModels.findByIdAndUpdate({
               _id: request.body.id
          }, {
               name: request.body.name,
               image: request?.file?.fileName
          });
          if (universityData) response.status(201).send({
               message: 'University Updated'
          });
          else
               response.status(404).send({
                    message: 'Unable to Update University'
               })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
};

export const DeleteUniversity = async (request, response) => {
     try {
          const universityData = await UniversityModels.deleteOne({
               _id: request.body.id
          });
          if (universityData.deletedCount == 1) response.status(201).send({
               message: 'University Deleted'
          })
          else
               response.status(404).send({
                    message: 'Unable to Delete University'
               })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
};

export const GetUniversity = async (request, response) => {
     try {
          const universityData = await UniversityModels.find();
          response.status(200).send({ universityData })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
};
