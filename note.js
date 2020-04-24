const fs = require('fs');

function getNotes() {
    return "Your notes...";
}

const addNote = (title, body) => {
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
        console.log('New note added')
    } else {
        console.log('Note title already taken')
    }
}

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
    addNote: addNote
}