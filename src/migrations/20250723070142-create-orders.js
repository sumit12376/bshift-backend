"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "useremployee",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM(
          "pending",
          "confirmed",
          "preparing",
          "delivered",
          "cancelled"
        ),
        defaultValue: "pending",
      },
      paymentMethod: {
        type: Sequelize.ENUM("cod", "upi", "card", "online"),
        allowNull: false,
        defaultValue: "cod",
      },

      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      items: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
