const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./note.js');

// create 'add' command. Passes options as object. The 'builder' is for building your command. The 'handler' executes the command.
yargs.command({
    command: 'add',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }   
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
})

// create 'remove' command
yargs.command({
    command: 'remove',
    builder: {
        title: {
            describle: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    describe: 'Remove note',
    handler: (argv) => {
        notes.removeNote(argv.title)
        //console.log("Removing note")
    }
})

// create 'list' command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => {
        console.log("Listing all notes")
    }
})

// create 'red' command
yargs.command({
    command: 'read',
    describe: 'Read current note',
    handler: () => {
        console.log("Reading a note")
    }
})

//can be used instead of console.log'ing yargs "console.log(yargs.argv)"
yargs.parse()

/*access commandline arguments passed into the app
it returns 3 strings: the path for nodejs on your machine, the path to the project, and the value passed */
//console.log(process.argv[2]);