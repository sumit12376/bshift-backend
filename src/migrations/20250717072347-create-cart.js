'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'useremployee', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      items: {
        type: Sequelize.JSON, 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};




// [
//   {
//     menuItemId: 12,
//     quantity: 2,
//     price: 150
//   },
//   {
//     menuItemId: 8,
//     quantity: 1,
//     price: 100
//   }
// ]

