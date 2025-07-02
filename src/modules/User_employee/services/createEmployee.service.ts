import { CreateInput } from "../schema/userEmployee.schema";
import { UserEmployee } from "../models/userEmployee.model";
import bcrypt from "bcrypt";
import { GetEmployeeListInputType } from "../schema/userEmployee.schema";
import { Op } from "sequelize";
import { deleteInput } from "../schema/userEmployee.schema";
import { updateInputType } from "../schema/userEmployee.schema";
export const UserEmployeeService = {
  // Create a new employee
 async create(input: CreateInput) {
  const existingUser = await UserEmployee.findOne({ where: { email: input.email } });

  if (existingUser) {
    return {
      success: false,
      message: "Already register",
    };
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = await UserEmployee.create({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
},

   async getEmployee(input: GetEmployeeListInputType) {
  const { filter, metadata } = input;
  const { searchQuery } = filter;

  let searchFilter: Record<string, any> = {};

  if (searchQuery) {
    searchFilter = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${searchQuery}%` } },
        { email: { [Op.iLike]: `%${searchQuery}%` } },
      ],
    };
  }

  const limit = metadata.size === -1 ? 9999 : metadata.size;
  const offset = (metadata.page - 1) * limit;

  const Employee = await UserEmployee.findAndCountAll({
    distinct: true,
    attributes: { exclude: ['password'] },
    where: { ...searchFilter },
    limit,
    offset,
    order: [[metadata.sortBy, metadata.sortOrder]],
  });

  return {
    success: true,
    data: {
      nodes: Employee.rows,
      metadata: {
        page: metadata.page,
        size: metadata.size,
        totaldocs: Employee.count,
      },
    },
    message: 'done',
  };
},

async deleteemployee(id: deleteInput) {
  const employee = await UserEmployee.findByPk(id.id);
  if (!employee) {
     return {success: false, message: "Employee Not found" };
  }
  await employee.destroy();
  return { message: "Emplosyee deleted successfully" };
},


async updateservice(input: updateInputType) {
  const { id, name, password, email } = input;

  const employee = await UserEmployee.findByPk(id);
  if (!employee) {
    return { success: false, message: "Employee Not found" };
  }

  const updatedFields: any = { name: name, email: email };
  if (password && password.trim() !== '') {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedFields.password = hashedPassword;
  }

  const newData = await employee.update(updatedFields);

  return {
    newData,
    success: true,
    message: "Employee updated successfully"
  };
}

};
