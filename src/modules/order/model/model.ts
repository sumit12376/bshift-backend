import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../utils/database/sequelize";

export class Order extends Model {
  declare id: number;
  declare userId: number;
  declare status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "delivered"
    | "cancelled";
  declare paymentMethod: "cod" | "upi" | "card" | "online";
  declare address: string;
  declare items: any[];
  declare createdAt: Date;
  declare updatedAt: Date;

  public static initialize(): void {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "useremployee",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        status: {
          type: DataTypes.ENUM(
            "pending",
            "confirmed",
            "preparing",
            "delivered",
            "cancelled"
          ),
          allowNull: false,
          defaultValue: "pending",
        },
        paymentMethod: {
          type: DataTypes.ENUM("cod", "upi", "card", "online"),
          allowNull: false,
          defaultValue: "cod",
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        items: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
      },
      {
        sequelize,
        tableName: "orders",
        modelName: "Order",
        timestamps: true,
        paranoid: false,
      }
    );
  }
}
