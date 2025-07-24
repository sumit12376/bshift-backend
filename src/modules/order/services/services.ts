import { getorderschematype, orderSchema, orderSchemaType } from "../schema/schema";
import { Order } from "../model/model";
import { Menu } from "@/modules/menu/model";
import { UserEmployee } from "@/modules/User_employee/models/userEmployee.model"
import { Cart } from "@/modules/cart/model/model";

export const placeorderService = async (input: orderSchemaType) => {
  const { userId, items, status, paymentMethod, address } = input;


  const user = await UserEmployee.findByPk(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }


  const menuIds = items.map(item => item.menuId);
console.log(menuIds)

  const menus = await Menu.findAll({
    where: {
      id: menuIds
    }
  });
console.log("abbababa", menus)

  if (menus.length !== menuIds.length) {
    throw new Error(`One or more menu items are invalid`);
  }


const order = await Order.create({
  userId,
  status,
  paymentMethod,
  address,
  items 
});

if(order){
  await Cart.destroy({
    where:{userId},
  })
}

console.log("klnpojpojpo",order)

  return {
    success: true,
    message: "Order placed successfully",
    data: {
      order,
      items
    }
  };
};


export const getOrderService = async (input: getorderschematype) => {
  const { id } = input;

  const exist = await UserEmployee.findByPk(id, {
    include: [
      {
        model: Order,

      },
    ],
  });
console.log(exist)
  if (!exist) {
    throw new Error("User not found");
  }

  return {
    success: true,
    message: "Fetching orders successful",
    data: exist,
  };
};



