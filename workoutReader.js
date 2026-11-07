const fs = require('fs');
const csv = require('csv-parser');

async function workoutCalculator(filePath = './data/workouts.csv') {
    const rows = [];
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) return reject(new Error(`File not found: ${filePath}`));

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', row => rows.push(row))
            .on('end', () => {
                let totalMinutes = 0;
                for (let i = 0; i < rows.length; i++) totalMinutes += Number(rows[i].minutes) || 0;

                console.log(`Total workouts: ${rows.length}\nTotal minutes: ${totalMinutes}`);
                resolve({ totalWorkouts: rows.length, totalMinutes });
            })
            .on('error', err => reject(new Error(`Error parsing CSV: ${err.message}`)));
    });
}

module.exports = { workoutCalculator };