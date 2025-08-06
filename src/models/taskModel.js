const { Sequelize, db } = require('../data/connection');

const TaskModel = db.define('task', {
    title: { type: Sequelize.STRING,
        unique: true,
    },
    desc: Sequelize.STRING,
    status: Sequelize.STRING,
    due: Sequelize.DATEONLY,
});

module.exports = {
    TaskModel
};
