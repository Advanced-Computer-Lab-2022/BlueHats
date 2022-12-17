import React from "react";
import { useState } from "react";

function Notes() {
  const [noteInput, setNoteInput] = useState("");
  const addNote = () => {};
  return (
    <div>
      <h1>Sticky Notes</h1>
      <form onSubmit={addNote} className="note-form">
        <textarea
          value={noteInput}
          onChange={(event) => setNoteInput(event.target.value)}
          placeholder="create a new note .."
        ></textarea>
        <button>Add</button>
      </form>
    </div>
  );
}

export default Notes;
