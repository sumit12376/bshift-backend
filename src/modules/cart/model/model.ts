import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/utils/database/sequelize";

export class Cart extends Model {
  public id!: number;
  public userId!: number;
  public items!: any[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(): void {
    Cart.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        items: {
          type: DataTypes.JSON,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "Cart",
        tableName: "Carts",
        timestamps: true
      }
    );
  }
}
