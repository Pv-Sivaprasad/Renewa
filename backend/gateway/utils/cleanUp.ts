import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(__dirname, 'logs', 'access.log');
const LOG_RETENTION_DAYS = 30; 

const clearOldLogs = () => {
    fs.stat(LOG_FILE, (err, stats) => {
        if (err) {
            console.error("Error accessing log file:", err);
            return;
        }

        const fileAgeInDays = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60 * 24);
        if (fileAgeInDays > LOG_RETENTION_DAYS) {
            fs.truncate(LOG_FILE, 0, (err) => {
                if (err) {
                    console.error("Error clearing log file:", err);
                } else {
                    console.log("Log file cleared after 30 days.");
                }
            });
        }
    });
};


setInterval(clearOldLogs, 24 * 60 * 60 * 1000);
