import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/utils/database/sequelize";
import { Restaurant } from "../Restaurent/model/restaurant.model";

export class Menu extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string;
  public category?: string;
  public restaurantId!: number;

  static initialize() {
    Menu.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
           type: DataTypes.FLOAT, 
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        category: {
          type: DataTypes.STRING,
        },
        restaurantId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
  Image: {
  type: DataTypes.ARRAY(DataTypes.STRING),
  allowNull: true,
}

      },
      {
        sequelize,
        modelName: "Menu",
        tableName: "menu",
        timestamps: true,
      }
    );
  }
}
