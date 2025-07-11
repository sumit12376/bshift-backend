import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../utils/database/sequelize';

export class User extends Model {
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;
  public phoneNumber!: string;
  public city!: string;
  public state!: string;
  public address!: string;
  public zipCode!: string;
  public dob!: Date;
  public createdBy!: number;
  public updatedBy!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  public static initialize(): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        phoneNumber: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        city: {
          type: DataTypes.STRING,
        },
        state: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        zipCode: {
          type: DataTypes.STRING,
        },
        dob: {
          type: DataTypes.DATE,
        },
        createdBy: {
          type: DataTypes.INTEGER,
        },
        updatedBy: {
          type: DataTypes.INTEGER,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedAt',
      }
    );
  }
}
