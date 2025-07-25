import { Restaurant } from "@/modules/Restaurent/model/restaurant.model";
import { Menu } from "@/modules/menu/model";
// import { User } from "@/modules/IAM/models/user.model";
import { UserEmployee } from "@/modules/User_employee/models/userEmployee.model";
import { Cart } from "@/modules/cart/model/model";
import { Order } from "@/modules/order/model/model";

export const setupAssociations = () => {
  // Restaurant ->    Menu
  Restaurant.hasMany(Menu, {
    foreignKey: "restaurantId",
    as: "menus",
  });

  Menu.belongsTo(Restaurant, {
    foreignKey: "restaurantId",
    as: "restaurant",
  });

  // User ->  Cart
  UserEmployee.hasMany(Cart, {
    foreignKey: "userId",
    as: "carts",
  });

  Cart.belongsTo(UserEmployee, {
    foreignKey: "userId",
    as: "user",
  });
Order.belongsTo(UserEmployee, { foreignKey: 'userId' });
// Order.belongsTo(Menu, { foreignKey: 'menuId' });
UserEmployee.hasMany(Order, { foreignKey: 'userId' });
// Menu.hasMany(Order, { foreignKey: 'menuId' });
};
