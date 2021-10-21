"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          fname: "testtwofname",
          mname: "testtwomname",
          lname: "testtwolname",
          email: "testtwoemail",
          mobile: "8888888888",
          pannumber: "TESTABCDEF",
          password: "123123",
          birthdate: new Date(),
          upi_payment_id: "testtwo@oktest",
          upi_status: 0,
          user_status: 0,
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return await queryInterface.bulkDelete("Users", null, {});
  },
};
