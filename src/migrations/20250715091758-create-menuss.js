'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.createTable("menu",{
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false,

  },
  name:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  price:{
    type:Sequelize.DECIMAL,
     allowNull:false,
  },
   description:{
    type:Sequelize.STRING,
     allowNull:false,
  },
   category:{
    type:Sequelize.STRING,
     allowNull:false,
  },
Image: {
  type: Sequelize.ARRAY(Sequelize.STRING),
  allowNull: true
},
  restaurantId:{
type:Sequelize.INTEGER,
allowNull:false,
        references: {
          model: "restaurants",
          key: "id",
        },
        onDelete: "CASCADE",
  },
  createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        allowNull: false,
      },
}) 

},

  async down (queryInterface, Sequelize) {
 await queryInterface.dropTable("menu");
  }
};
