import { Cart } from "@/modules/cart/model/model";
import { Menu } from "@/modules/menu/model";
import { Restaurant } from "@/modules/Restaurent/model/restaurant.model";
import { UserEmployee } from "@/modules/User_employee/models/userEmployee.model";
import { setupAssociations } from "./setupAssociations";

export const initModels = async () => {
  // 1. Initialize models
  Restaurant.initialize();
  Menu.initialize();
  Cart.initialize();
  UserEmployee.initialize();

  // 2. Setup associations
  setupAssociations();
};
