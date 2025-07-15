import { Restaurant } from "@/modules/Restaurent/model/restaurant.model";
import { Menu } from "@/modules/menu/model";

export const setupAssociations = () => {
  Restaurant.hasMany(Menu, { foreignKey: "restaurantId", as: "menus" });
  Menu.belongsTo(Restaurant, { foreignKey: "restaurantId", as: "restaurant" });
};
