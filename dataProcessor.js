require('dotenv').config();
const { workoutCalculator } = require('./workoutReader');
const { healthMetricsCounter } = require('./healthReader');

async function processFiles() {
    try {
        const name = process.env.USER_NAME || 'User';
        const goal = Number(process.env.WEEKLY_GOAL) || 150;

        console.log(`Processing data for: ${name}`);
        
        console.log('Reading workout data...');
        const workouts = await workoutCalculator('./data/workouts.csv');

        console.log('Reading health data...');
        const healthCount = await healthMetricsCounter('./data/health-metrics.json');

        console.log('=== SUMMARY ===');
        console.log(`Workouts found: ${workouts.totalWorkouts}`);
        console.log(`Total workout minutes: ${workouts.totalMinutes}`);
        console.log(`Health entries found: ${healthCount}`);
        console.log(`Weekly goal: ${goal} minutes`);

        if (workouts.totalMinutes >= goal) {
            console.log(`Congratulations ${name}! You have exceeded your weekly goal!`);
        } else {
            console.log(`Keep going ${name}! You're working towards your goal.`);
        }
    } catch (err) {
        console.error('Error processing files:', err.message);
    }
}

processFiles();