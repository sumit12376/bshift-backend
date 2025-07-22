import { getorderschematype, orderSchema, orderSchemaType } from "../schema/schema";
import { Order } from "../model/model";
import { Menu } from "@/modules/menu/model";
import { UserEmployee } from "@/modules/User_employee/models/userEmployee.model";
export const placeorderService = async (input: orderSchemaType) => {
  const { userId, menuId, totalAmount, status, paymentMethod, address } = input;

  // First check if user exists
  const user = await UserEmployee.findByPk(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  const menu = await Menu.findByPk(menuId);
  if (!menu) {
    throw new Error(`Menu item with ID ${menuId} not found`);
  }

  // Proceed with order creation
  const create = await Order.create({
    userId,
    menuId,
    totalAmount,
    status,
    paymentMethod,
    address
  });

  return {
    success: true,
    message: "Order placed successfully",
    data: create
  };
};

export const getOrderService = async (input: getorderschematype) => {
  const { id } = input;

  const exist = await Order.findByPk(id);
  if (!exist) {
    throw new Error("Order not found");
  }

  const ans = await Order.findAndCountAll({
    where: { id },
  });

  return {
    success: true,
    message: "fetching order successfull",
    data: ans
  }
};



