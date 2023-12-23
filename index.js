const fs = require('fs');

/**
 * @description Require and parse .env, env.json, and .genv files
 * @param  {String} configFile The file to require. Or leave it undefined to load '.env' file
 * @execute Sets the data read in the configuration file as properties in process.env
 * @return {Object} Returns a reference to 'process.env'
*/
function envine (configFile = '.env') {
    let data;
    
    if (!fs.existsSync(configFile)) {
        throw new Error("Config file is unreacheable");
    }

    if (configFile.endsWith('.json')) {
        data = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
        for (let key in data) process.env[key] = data[key];

    } else if (configFile.endsWith('.env') || configFile.endsWith('.genv')) {
        data = fs.readFileSync(configFile, 'utf-8');
        data = data.replace(/\r\n?/gim, '\n').split("\n").map(x => {
            let a = x.split("=").map(x=>x.trim());
            return [ a[0], a.slice(1).join('') ];
        });
    
        for (let subarr of data) {
            process.env[subarr[0]] = (subarr[1] || '');
        }
    }

    return process.env;
}

module.exports = envine;

// Reads the .genv file that was pointed
// parse its content: (the same as in 'env' files)
// '//' for comments
// key=value
// OR: (if JSON format is selected)
// { key: value }