import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../utils/database/sequelize";

// Change from class declaration to interface-style with declare
export class Order extends Model {
  declare id: number;
  declare userId: number;
  declare menuId: number;
  declare totalAmount: number;
  declare status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  declare paymentMethod: string;
  declare address: string;
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
            model: 'useremployee',
            key: 'id'
          }
        },
        menuId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { 
            model: 'menu',
            key: 'id'
          }
        },
        totalAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            min: 0
          }
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
          validate: {  // Add validation
            notEmpty: true
          }
        },
      },
      {
        sequelize,
        tableName: "orders", 
        modelName: "Order",
        timestamps: true,

        paranoid: false    
      }
    );
  }
}

// Add this if you're not already calling it during