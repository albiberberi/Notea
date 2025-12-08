import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from "./NewNote";
import { Container } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import {v4 as uuidV4} from "uuid";
import { NoteList } from "./NoteList";
import { Note } from "./Note";

export type Note = {
  id: string
} & NoteData // Intersection type to combine NoteData with an id

export type NoteData = {
  id: string
  title: string
  markdown: string
  tags: Tag[] 
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type Tag = {
  id: string
  label: string 
}

export default function App(){ 
  const[notes, setNotes] = useState<RawNote[]>(() => {
    // Initialization function to load notes from localStorage, otherwise start with an empty array
    const localNotes = localStorage.getItem("NOTES"); // Retrieve notes from localStorage
    if (localNotes) {
      return JSON.parse(localNotes); // Parse and return the notess
    }
    return []; //returning an empty array if no notes found
  }); 
  
  
  //same logic but for tags 
  const[tags, setTags] = useState<Tag[]>(() => { 
    const localTags = localStorage.getItem("TAGS");
    if (localTags) {
      return JSON.parse(localTags);
    }
    return [];
  });


  useEffect(() => { //we update localStorage whenever notes change
    localStorage.setItem("NOTES", JSON.stringify(notes)); // Store notes in localStorage by converting to a JSON string bcs localStorage only supports string values
  }, [notes]); //in a dependency array so it runs whenever notes change

  // same thing for tags
  useEffect(() => { 
    localStorage.setItem("TAGS", JSON.stringify(tags)); 
  }, [tags]);

  const notesWithTags = useMemo(() => { //hook to cache the computed notes with their associated tags
    return notes.map(note=>{ //mapping over raw notes to combine them with their tags
      return {
        ...note, //spreading the raw note properties
        tags: tags.filter(tag => note.tagIds.includes(tag.id)) //filtering tags to only include those associated with the note by checking if the tag's id is in the note's tagIds array
      }
    })
  }, [notes, tags]);


  function onCreateNote({tags, ...data}: NoteData) 
//function to handle creation of a new note by accepting NoteData
{

  //state setter to update notes array through a callback function prevNotes
  setNotes(prevNotes => {
      return [ //returning a new array including all previous notes and the new note
        ...prevNotes, //copying all previous notes avoiding direct modification

        //the new note object where we spread data and generate an id using the imported library
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }, //then we add an array of tagIDs that takes the tags and maps them to their ids
      ]
    })


}

//function to handle adding a new tag by accepting a Tag object
function addTag(tag:Tag){
  setTags(prev=>[...prev, tag])//update the state by adding the new tag to the existing array of tags
}


//function to handle deleting a note by accepting the note's id
function onDeleteNote(id:string){ 
  setNotes(prevNotes => { //update the notes array using a call back function which filters the note based on the id.
    return prevNotes.filter(note => note.id !==id)
  })
}

return (
     <Container className="mb-4" >
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} onDeleteNote={onDeleteNote} />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} /> 
        {/*route to create a new note */}

        
        <Route path="/:id">
          <Route index element={<Note notes={notesWithTags} onDelete={onDeleteNote} />}></Route> {/*route to display a specific note based on its id */} 
        </Route>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )

}
