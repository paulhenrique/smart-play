const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'music-app-temp');
const targetDir = __dirname;

if (!fs.existsSync(sourceDir)) {
    console.log('Source directory does not exist');
    process.exit(1);
}

const items = fs.readdirSync(sourceDir);

items.forEach(item => {
    const sourcePath = path.join(sourceDir, item);
    const targetPath = path.join(targetDir, item);

    // Skip locked node_modules if needed, but better to move all
    try {
        fs.renameSync(sourcePath, targetPath);
        console.log(`Moved ${item}`);
    } catch (err) {
        console.error(`Error moving ${item}:`, err);
    }
});

// Try to remove the empty directory
try {
    fs.rmdirSync(sourceDir);
    console.log('Removed temp directory');
} catch (err) {
    console.error('Error removing temp directory:', err);
}
