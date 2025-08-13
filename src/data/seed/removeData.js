const { TaskModel } = require("../../models/taskModel");
const { db } = require('../connection');

async function removeSeedData(input) {
    let records = input;
    while (records >0) {
    await TaskModel.destroy({where:{ status: "Hopefully complete"}});
    records--;
    }
}

removeSeedData(19);
