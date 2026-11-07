const fs = require('fs').promises;

async function healthMetricsCounter(filePath = './data/health-metrics.json') {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const parsedData = JSON.parse(data);
        const count = Array.isArray(parsedData) ? parsedData.length : Object.keys(parsedData).length;
        console.log(`Total health entries: ${count}`);
        return count;
    } catch (error) {
        console.error(`Error reading health data: ${error.message}`);
        throw error;
    }
}

module.exports = { healthMetricsCounter };