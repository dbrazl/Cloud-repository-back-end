module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'avatar', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'avatar');
  },
};
