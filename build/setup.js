/* eslint-disable */

//
// check if node modules have been installed, and if
// not give the user a some help installing them.
//
try {
    var chalk = require('chalk');
    var exec = require('child_process').exec;
    var fs = require('fs');
    var path = require('path');
    var prompt = require('prompt');
    var rimraf = require('rimraf');
} catch (e) {
    console.log('e', e);
    console.log('You must run the following command before setting up your theme.');
    console.log();
    console.log('$ npm install');

    return;
}

// helper function to read and write files
function read(file) {
    return String(fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8'));
}

function replace(file, target, value) {
    var content = read(file);

    write(file, content.replace(target, value));
}

function write(file, content) {
    fs.writeFileSync(path.resolve(__dirname, '..', file), content);
}

const themeDirectory = path.basename(path.resolve(__dirname, '..'));

var schema = {
    properties: {
        name: {
            default: themeDirectory,
            description: chalk.gray('  Name'),
            required: true,
        },
        description: {
            description: chalk.gray('  Description'),
            required: false,
        },
        author: {
            description: chalk.gray('  Author'),
            required: false,
        },
        url: {
            default: 'localhost',
            description: chalk.gray('  Application URL'),
            required: true,
        },
        cleanup: {
            before: function(value) {
                return Boolean(value.match(/^[Yy](.*)/));
            },
            default: 'y',
            description: chalk.gray('  Remove setup command (y/n)'),
            message: 'Answer must be yes or no',
            pattern: /^[YyNn](.*)*/,
            required: true,
        },
    },
};

//
// if they haven't removed our repo yet, offer to do it for them
//
var isVuetoberRepository;

try {
    var gitConfig = read('.git/config');

    isVuetoberRepository = Boolean(gitConfig.match(/github\.com[\/:]scottbedard\/oc-vuetober-theme/g));
} catch (err) {
    isVuetoberRepository = false;
}

if (isVuetoberRepository) {
    schema.properties.cleanupGit = {
        before: function(value) {
            return Boolean(value.match(/^[Yy](.*)/));
        },
        default: 'y',
        description: chalk.gray('  Remove git repository (y/n)'),
        pattern: /^[YyNn](.*)*/,
        required: true,
    };
}

//
// start the setup prompt
//
console.log (chalk.white('  Setup a new Vuetober theme'));
console.log ();

prompt.message = false;
prompt.start();

prompt.get(schema, function(err, result) {
    if (err) {
        console.log ();
        console.log ();
        console.log (chalk.red('  Setup canceled'));
        return;
    }

    // create .env file
    var env = read('.env.example');
    
    // write('.env', env.replace('VUETOBER_URL=localhost', 'VUETOBER_URL=' + result.url));

    // create theme.yaml file
    var theme =
        'name: \'' + result.name + '\'\n' +
        'description: \'' + result.description + '\'\n' +
        'author: \'' + result.author + '\'';

    // write ('theme.yaml', theme);

    // update theme directory references
    replace('config/index.js', '__vuetober__', themeDirectory);

    // remove setup command
    if (result.cleanup) {
        var setupPath = path.resolve(__dirname, 'setup.js');
        var packageJson = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
            .replace('"setup": "node build/setup.js",\n    ', '');

        fs.writeFileSync(path.resolve(__dirname, '../package.json'), packageJson);
        rimraf.sync(setupPath);
    }

    // remove the old git repository
    if (result.cleanupGit) {
        rimraf.sync(path.resolve(__dirname, '../.git'));
    }

    // instruct october to use our new theme
    var cmd = 'php artisan theme:use ' + themeDirectory + ' --force';
    exec(cmd, { cwd: path.resolve('../../') }, function(error, stdout, stderr) {

        // show the success message
        console.log ();
        console.log (chalk.green('  Vuetober set up complete, time to build something amazing!'));
        console.log ();
        console.log (chalk.gray('  You\'ll need to run the following command before viewing your theme in the browser.'));
        console.log ();
        console.log (chalk.gray('  $ npm run build'));
    });
});