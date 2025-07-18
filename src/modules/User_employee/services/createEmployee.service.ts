import { CreateInput } from "../schema/userEmployee.schema";
import { UserEmployee } from "../models/userEmployee.model";
import bcrypt from "bcrypt";
import { GetEmployeeListInputType } from "../schema/userEmployee.schema";
import { Op } from "sequelize";
import { deleteInput } from "../schema/userEmployee.schema";
import { updateInputType } from "../schema/userEmployee.schema";
import { sendMail } from "../../../utils/email";
import { Cart } from "@/modules/cart/model/model";
// import { Cart } from "@/modules/cart/model/model";
// import { cartListInputType } from "../schema/userEmployee.schema";
export const UserEmployeeService = {
  async create(input: CreateInput) {
    const existingUser = await UserEmployee.findOne({
      where: { email: input.email },
    });

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
      profile: input.profile,
    });
const subject = `Welcome to DeRestaurant`;

const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 8px rgba(0,0,0,0.05);">
      <h2 style="color: #2c3e50; text-align: center;">Welcome to <span style="color: #e67e22;">DeRestaurant</span>!</h2>

      <p style="font-size: 16px; color: #333;">Hi there,</p>

      <p style="font-size: 16px; color: #333;">
        Thank you for signing up with <strong>DeRestaurant</strong> – your all-in-one solution for restaurant management.
        We're thrilled to have you join our community!
      </p>

      <p style="font-size: 16px; color: #333;">
        With DeRestaurant, you’ll be able to simplify operations, manage orders, and grow your business effortlessly.
      </p>

      <p style="font-size: 16px; color: #333;">
        If you have any questions, feel free to reach out. We're always here to help!
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

      <p style="font-size: 14px; color: #555;">
        Need assistance? Email us at <a href="mailto:support@derestaurant.com" style="color: #e67e22;">support@derestaurant.com</a>.
      </p>

      <p style="margin-top: 30px; font-size: 14px; color: #333;">
        Cheers,<br />
        <strong>The DeRestaurant Team</strong>
      </p>
    </div>

    <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
      <p>&copy; ${new Date().getFullYear()} DeRestaurant. All rights reserved.</p>
    </div>
  </div>
`;

 const mail= await sendMail(user.email, subject, htmlContent);
    return {
      success: true,
      mail,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
          profile: input.profile,
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
  attributes: { exclude: ["password"] },
  where: { ...searchFilter },
  include: [
    {
      model: Cart,
      as: "carts", 
      attributes: { exclude: ["createdAt", "updatedAt"] }
    }
  ],
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
      message: "done",
    };
  },
// async getEmployee(){

// },
  async deleteemployee(id: deleteInput) {
    const employee = await UserEmployee.findByPk(id.id);
    if (!employee) {
      return { success: false, message: "Employee Not found" };
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
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const newData = await employee.update(updatedFields);

    return {
      newData,
      success: true,
      message: "Employee updated successfully",
    };
  },

}
