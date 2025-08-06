const { TaskModel } = require("../../models/taskModel");
const { db } = require('../connection');

async function createSeedData(amount) {

    for(let i=0; i<amount; i++){
        await TaskModel.create(
            {
                title:`Task ${i}`,
                desc:`Test task number ${i}`,
                status:"incomplete",
                due: "25th December 2025"
            }
        );
    }
}

createSeedData(20);
