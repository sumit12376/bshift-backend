
import { Menu } from "./model";
import { CreateMenuInputType, deleteMenuByType, GetMenuByRestaurantType, updateMenuType } from "./schema";
import { Restaurant } from "../Restaurent/model/restaurant.model";
import { updateInputType } from "../User_employee/schema/userEmployee.schema";

export const createMenu = async (input: CreateMenuInputType & { images?: string[] }) => {
  const { name, price, description, category, restaurantId, Image} = input;

  const restaurant = await Restaurant.findByPk(restaurantId);
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const menuItem = await Menu.create({
    name,
    price,
    description,
    category,
    restaurantId,
    Image,
  });

  return menuItem.get({ plain: true });
};


export const removeMenuServices=async(input:deleteMenuByType)=>{
  const {menuId}= input
  const menu = await Menu.findByPk(menuId)
  if (!menu) {
    throw new Error("Menu not found");
  }
  await menu.destroy();
  return {
    success: true,
    message: 'menu deleted successfully',
  }
}
export const GetMenu = async (input: GetMenuByRestaurantType) => {
  const { restaurantId } = input;

  const restaurant = await Restaurant.findByPk(restaurantId, {
    include: [
      {
        model: Menu,
        as: 'menus',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    attributes: { exclude: ['password', 'deletedAt', 'createdAt', 'updatedAt'] },
  });

  if (!restaurant) {
    throw new Error("Restaurantss not found");
  }

  return {
    success: true,
    message: 'Restaurant with menus fetched successfully',
    data: restaurant,
  };

};
export const updateMenuService = async(input:updateMenuType)=>{
  // const{menuId, name, price, description, category, restaurantId}= input;
    const{menuId, name, price, description, category, Image}= input;
  // const restaurant = await Restaurant.findByPk(restaurantId)
  // if(!restaurant){
  //   throw new Error("Restaurantid not finde")
  // }
  const updatedFields : any= {
    name:name,
    price:price,
    description:description,
    category:category,
    // restaurantId:restaurantId
  }

    if (Image && Image.length > 0) {
    updatedFields.Image = Image;
  }
   const [updatedCount] = await Menu.update(updatedFields, {
    where:{id:menuId}
  });
  if (updatedCount === 0) {
    throw new Error("Menu item not found or no changes made");
  }

  const updatedMenu = await Menu.findByPk(menuId);
  return{
  success:'true',
  message:'update succesfully',
   data: updatedMenu,
  }
}














// {
//   "name": "aaFsujiyu Pizza",
//   "price": 199,
//   "description": "Loaded with veggies and cheese",
//   "category": "Veg"
// //   "restaurantId": 3
// }