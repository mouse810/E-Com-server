import { request, response } from "express"

export const CreateDepartment = async (request, response) => {
     try {
          const departmentDAta = await DepartmentModel.Create({
               name: request.body.name,
               image: request?.file?.fileName,
               university: request.body.universityId
          });
          if (departmentDAta) response.status(201).send({ message: 'Department Created' });
          else response.status(404).send({ message: 'Unable to Create Department' });
     }
     catch (event) {
          response.status(404).send({ error: event?.message })
     }
};

export const UpdateDepartment = async (request, response) => {
     try {
          const departmentData = await DepartmentModel.findByIdAndUpdate({ _id: request.body.name },
               {
                    name: request.body.name,
                    image: request?.file?.fileName,
                    university: request.body.university
               })
          if (departmentData) response.status(201).send({ message: 'Department Updated' });
          else response.status(404).send({ message: 'Unable to Update Department' })
     } catch (event) {
          response.status(404).send({ message: event?.message });
     }
}
export const DeleteDepartment = async (request, response) => {
     try {
          const departmentData = await DepartmentModel.deleteOne({ _id: request.body.id })
          if (departmentData.deleteCount == 1) response.status(200).send({ message: 'Department Deleted' })
          else response.status(404).send({ message: 'Unable to Delete Department' })
     } catch (event) {
          response.status(404).send({ error: event?.message })
     }
}
export const GetDepartmentsByUniversityById = async (request, response) => {
     try {
          const departmentData = await DepartmentModel.find({ university: request.query.universityId })
               .Populate("university").response.status(200).send({ departmentData })

     } catch (event) {
          response.status(404).send({ message: error.event?.message })
     }
}
