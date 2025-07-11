import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../../utils/database/sequelize";

export class UserEmployee extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  public static initialize(): void {
    UserEmployee.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        profile: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "employee",
        },
      },
      {
        sequelize,
        modelName: "UserEmployee",
        tableName: "useremployee",
        timestamps: true,
      }
    );
  }
}
