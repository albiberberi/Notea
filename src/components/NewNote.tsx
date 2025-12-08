import { NoteForm } from "./NoteForm";
import type { NoteData, Tag } from "./App";

// Define the props for the NewNote component
type NewNoteProps = {
    onSubmit: (data: NoteData) => void //what happens when the form is submitted is that it calls onSubmit with the note data, which is passed from the parent component, App.tsx, to create a new note 
    onAddTag: (tag: Tag) => void //same logic for adding a new tag
    availableTags: Tag[] //we create an array of available tags to choose from when creating a new note
}

//create the function component NewNote which takes the props above 
export function NewNote ({onSubmit, onAddTag, availableTags}: NewNoteProps) {
    return(
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag= {onAddTag} availableTags={availableTags}/> 
            {/*render the NoteForm component and pass down the props received by NewNote*/}
        </>
    )
}