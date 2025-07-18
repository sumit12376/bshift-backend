import { Cart } from "@/modules/cart/model/model";
import { CreateCartInput } from "@/modules/cart/schema/schema";
import { User } from "@/modules/IAM/models/user.model";
import { Menu } from "@/modules/menu/model";
import { UserEmployee } from "@/modules/User_employee/models/userEmployee.model";
import { cartListInputType } from "@/modules/cart/schema/schema";

type CartItem = {
  menuItemId: number;
  quantity: number;
};

export const CartService = {
async createCart(data: CreateCartInput) {
  const user = await UserEmployee.findByPk(data.userId);
  if (!user) throw new Error("User not found");

  for (const item of data.items) {
    const menu = await Menu.findByPk(item.menuItemId);
    if (!menu) {
      throw new Error(`MenuItem with ID ${item.menuItemId} not found`);
    }
  }

  let cart = await Cart.findOne({ where: { userId: data.userId } });

  if (!cart) {
    cart = await Cart.create({
      userId: data.userId,
      items: data.items,
    });
    return cart;
  }

  const existingItemsMap = new Map<number, CartItem>();
  for (const item of cart.items) {
    existingItemsMap.set(item.menuItemId, { ...item });
  }

  for (const incomingItem of data.items) {
    if (existingItemsMap.has(incomingItem.menuItemId)) {
      const existing = existingItemsMap.get(incomingItem.menuItemId)!;
      existing.quantity += incomingItem.quantity;
    } else {
      existingItemsMap.set(incomingItem.menuItemId, { ...incomingItem });
    }
  }

  const mergedItems = Array.from(existingItemsMap.values());
  cart.items = mergedItems;
  await cart.save();

  return cart;
},


async Getcartservice(input: cartListInputType) {
const { id } = input;
const userWithCarts = await UserEmployee.findByPk(id, {
  include: [
    {
      model: Cart,
      as: "carts", 
    },
  ],
});
return userWithCarts
  }


};
