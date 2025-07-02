import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../utils/database/sequelize';

export class Restaurant extends Model {
  public id!: number;
  public restaurantName!: string;
  public description!: string | null;
  public address!: string;
  public city!: string;
  public state!: string;
  public postalCode!: string;
  public country!: string;
  public phone!: string;
  public email!: string;
  public password!: string;
  public openingHours!: string;
  public rating!: number;
  public profilePicture!: string | null;
  public createdBy!: number | null;
  public updatedBy!: number | null;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date | null;

  public static initialize(): void {
    Restaurant.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        restaurantName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING,
        },
        city: {
          type: DataTypes.STRING(100),
        },
        state: {
          type: DataTypes.STRING(100),
        },
        postalCode: {
          type: DataTypes.STRING(20),
        },
        country: {
          type: DataTypes.STRING(100),
        },
        phone: {
          type: DataTypes.STRING(20),
        },
        email: {
          type: DataTypes.STRING(100),
        },
        password: {
          type: DataTypes.STRING(100),
        },
        openingHours: {
          type: DataTypes.STRING,
        },
        rating: {
          type: DataTypes.DECIMAL(2, 1),
          defaultValue: 0.0,
        },
        profilePicture: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        updatedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Restaurant',
        tableName: 'restaurants',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}
