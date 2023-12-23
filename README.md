# Envine:

Envine is a package for easily importing environment configuration files.

## Usage:

```
const envine = require('envine');
envine('./.env'); // loading a regular .env config file
envine('./env.json'); // loading a custom JSON object in environment

```

### API Methods:

```
envine(fname = '.env'): process.env

> Reads a configuration file 'fname', and parses its content, 
  adding key-value properties to the current 'process.env'.
> It is possible to pass either JSON, ENV, GENV, and any other file 
  using ENV config notation.
> Returns a reference to 'process.env'.
```

### Example usage:
```
// Declare and initialize the module
const envine = require('envine');

// Example 1:
// Loads a regular '.env' file, containing the property 'FOO:BAR':
// As '.env' is the default, there's no need of passing a filename,
//   but, it baheves the same as "envine('.env')"
envine(); 

// Acessing 'process.env.FOO' is now possible
console.log(process.env.FOO) //=> 'BAR'

// Example 2:
// Loads a custom 'env.json' file: "{ FOO2:'BAR2' }"
envine('env.json');

// Acessing 'process.env.FOO2' is now possible
console.log(process.env.FOO2) //=> 'BAR2'
```