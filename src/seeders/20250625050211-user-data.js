'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const admin = await queryInterface.rawSelect(
      'users',
      {
        where: {
          email: 'supperadmin@gmail.com',
        },
      },
      ['id']
    );

    if (!admin) {
      await queryInterface.bulkInsert('users', [
        {
          firstName: 'Supper',
          lastName: 'Admin',
          email: 'supperadmin@gmail.com',
          phoneNumber: '+4123456789',
          password:
            '$2b$10$OTqUDpfFUFIZ3cfI648IieuebSbXie2TxlJngNPvRGwlXbLWttY26',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'supperadmin@gmail.com',
    });
  },
};
