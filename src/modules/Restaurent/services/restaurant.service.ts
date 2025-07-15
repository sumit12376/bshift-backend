import { genearteRandomPassword } from '../../../utils/general/passwordGenrator';
import bcrypt from 'bcrypt';
import { Restaurant } from '../model/restaurant.model';
import { Menu } from '@/modules/menu/model';
import type { CreateRestaurantInputType, GetRestaurantListInputType } from '../schema/restaurant.schema';
import { Op } from 'sequelize';

interface RestaurantCreateResult {
  success: boolean;
  message: string;
  data?: any;
}

interface RestaurantListResult {
  success: boolean;
  message: string;
  data?: {
    nodes: any[];
    metadata: {
      page: number;
      size: number;
      totaldocs: number;
    };
  };
}

export const restaurantService = {
  //create res
  async createRestaurant(input: CreateRestaurantInputType): Promise<RestaurantCreateResult> {
    try {
      console.log("Received input for restaurant creation:", input);

      const plainPassword = genearteRandomPassword();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const inputData = {
        ...input,
        password: hashedPassword,
      };

      console.log("Attempting findOrCreate with:", {
        where: {
          restaurantName: input.restaurantName,
          email: input.email,
        },
        defaults: inputData,
      });

      const [restaurant, created] = await Restaurant.findOrCreate({
        where: {
          restaurantName: input.restaurantName,
          email: input.email,
        },
        defaults: inputData,
      });

      if (!restaurant) {
        throw new Error("Restaurant creation failed");
      }

      const restaurantJson = restaurant.toJSON();
      const { password, ...restaurantData } = restaurantJson;

      return {
        success: true,
        data: restaurantData,
        message: 'Restaurant created successfully',
      };
    } catch (error: any) {
      console.error("Detailed error:", error);
      return {
        success: false,
        message:'Error creating restaurant',
      };
    }
  },

 //get res
  async getRestaurantList(input: GetRestaurantListInputType): Promise<RestaurantListResult> {
    try {
      const { filter, metadata } = input;
      const { searchQuery } = filter;

      let searchFilter: Record<string, any> = {};

      if (searchQuery) {
        searchFilter = {
          [Op.or]: [
            {
              restaurantName: {
                [Op.iLike]: `%${searchQuery}%`,
              },
            },
          ],
        };
      }

      const limit = metadata.size === -1 ? 9999 : metadata.size;
      const offset = (metadata.page - 1) * limit;

const restaurant = await Restaurant.findAndCountAll({
  distinct: true,
  attributes: { exclude: ['deletedAt', 'password'] },
  where: {
    ...searchFilter,
  },
  include: [
    {
      model: Menu,
      as: "menus",
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
          nodes: restaurant.rows,
          metadata: {
            page: metadata.page,
            size: metadata.size,
            totaldocs: restaurant.count,
          },
        },
        message: 'done',
      };
    } catch (error: any) {
      console.error("Detailed error:", error);
      return {
        success: false,
        message: 'Error fetching restaurants',
      };
    }
  }
};
