module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'type');
  },
};
