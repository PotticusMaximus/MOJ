const { TaskModel } = require("../../models/taskModel");
const { db } = require('../connection');

async function removeSeedData() {

    await TaskModel.destroy({where: {due: "invalid date"}});
}

removeSeedData();
