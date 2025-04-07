import CompanyModel from "../DB/models/company.model.js";
import EmployeeModel from "../DB/models/employee.model.js";
import EmployerModel from './../DB/models/employer.model.js';
import bcrypt from "bcryptjs";
import hash from "./hashPass.js";

export const availableRoles = {
    Employee: EmployeeModel,
    Employer: EmployeeModel,
    Company: CompanyModel
}


export class Employee {
    constructor(data) {
        this.data = data
    }

    async create() {

        this.data.password = await hash(this.data.password)
        const newEmployee = await EmployeeModel.create(this.data)
        return newEmployee
    }
}


export class Employer {
    constructor(data) {
        this.data = data
    }

    async create() {

        this.data.password = await hash(this.data.password)

        const newCompany = await CompanyModel.create({ name: this.data.company_name, location: this.data.company_location })
        const newEmployer = await EmployerModel.create({ ...this.data, company: newCompany._id })

        return newEmployer
    }
}
