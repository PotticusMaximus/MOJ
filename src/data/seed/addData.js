const { TaskModel } = require("../../models/taskModel");
const { db } = require('../connection');

function generateRandomDate() {
    const year = Math.floor(Math.random() * (2025 - 2026) + 2026).toString();
    const month = Math.floor(Math.random() * (1 - 12) + 12).toString();
    const day = Math.floor(Math.random() * (1 - 28) + 28).toString();

    return (`${year}-${month}-${day}`);
}

async function createSeedData(amount) {

    for(let i=0; i<amount; i++){
        await TaskModel.create(
            {
                title:`Task ${i}`,
                desc:`Test task number ${i}`,
                status:"incomplete",
                due: generateRandomDate()
            }
        );
    }
}

createSeedData(20);
