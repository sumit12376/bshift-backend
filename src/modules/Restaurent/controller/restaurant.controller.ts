import { type Request, type Response, type NextFunction } from 'express';
import { restaurantService } from '../services/restaurant.service';
import { createRestaurantInput, getRestaurantListInput } from '../schema/restaurant.schema';

//create res
export const createRestaurant = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("req", request.body);
    const inputData = createRestaurantInput.parse(request.body);
    console.log("body", inputData);

    const result = await restaurantService.createRestaurant(inputData);
    console.log("resulttt", result);

    if (result.success) {
      response.status(201).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      response.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error: any) {
    console.error('Create Restaurant Error:', error);

    response.status(400).json({
      success: false,
      message: 'Validation failed or unexpected error',
    });
  }
};

//get res
export const getRestaurantList = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inputData = getRestaurantListInput.parse(request.body);
    const result = await restaurantService.getRestaurantList(inputData);

    if (result.success) {
      response.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } else {
      response.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error: any) {
    console.error('Get Restaurant List Error:', error);

    response.status(400).json({
      success: false,
      message: 'Validation failed or unexpected error',
    });
  }
};
