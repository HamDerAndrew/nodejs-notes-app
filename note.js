const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return "Your notes...";
}

const addNote = (title, body) => {
    //we load the current notes so we don't have to rewrite all of them again after adding a new note.
    const notes = loadNotes()
    const duplicateNotes = notes.filter(( note ) => {
        // if note is duplicate (true) it keeps the duplicate. If it's false, it won't keep it in the array. 
        return note.title === title
    })

    //If there are no duplicate notes in the array, it is empty, and we add the note.
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.black.bgGreen('New note added'))
    } else {
        console.log(chalk.white.bgRed('Note title already taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    //use 'filter()' to return a new array, where the note with the title to delete, is not included.
    const notesToNotDelete = notes.filter(( note ) => {
        return note.title !== title
    })

    if (notesToNotDelete.length < notes.length) {
        console.log(chalk.black.bgGreen('Note removed'))
        saveNotes(notesToNotDelete);
    } else {
        console.log(chalk.white.bgRed('Note doesn\'t exist'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse("Your notes"))
    notes.forEach(note => {
        console.log(chalk.blue.inverse(note.title))
    });
}


/* ============= */
// "API" functions 
/* ============= */

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        // turn dataBuffer from binary to string
        const dataJSON = dataBuffer.toString()
    
        //return JSON object
        return JSON.parse(dataJSON)
    } catch(error) {
        //returning an empty array because it's basically like having an empty file
        return []
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}