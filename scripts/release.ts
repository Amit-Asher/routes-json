import * as ChildProcess from "child_process"
import fs from 'fs';

if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found');
}

if (!fs.existsSync('release')) {
    fs.mkdirSync('release');
}

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
// create a regex for the version number
if (!(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(packageJson.version))) {
    throw new Error('package.json does not contain a version');
}

ChildProcess.execSync(`pkg --output release/routes-json.${packageJson.version} build/index.js`);
