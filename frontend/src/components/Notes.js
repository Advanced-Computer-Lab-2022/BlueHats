import React, { useState, useReducer } from "react";
import { v4 as uuid } from "uuid";

const initialNotesState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        notes: [...prevState.notes, action.payload],
        totalNotes: prevState.notes.length + 1,
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
      };
      console.log("After ADD_NOTE: ", newState);
      return newState;
    }

    case "DELETE_NOTE": {
      const newState = {
        ...prevState,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
        totalNotes: prevState.notes.length - 1,
      };
      console.log("After DELETE_NOTE: ", newState);
      return newState;
    }
    case "DOWNLOAD_NOTE": {
      const element = document.createElement("a");
      const file = new Blob([action.payload.text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "AmelioNotes.txt";
      element.click();
      const newState = {
        notes: [...prevState.notes],
        totalNotes: prevState.notes.length,
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
      };
      return newState;
    }
  }
};

function Notes() {
  const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);
  const [noteInput, setNoteInput] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    if (!noteInput) {
      return;
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
    };

    dispatch({ type: "ADD_NOTE", payload: newNote });
    setNoteInput("");
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const dropNote = (event) => {
    event.target.style.left = `${event.pageX - 50}px`;
    event.target.style.top = `${event.pageY - 50}px`;
  };

  return (
    <div className="app" onDragOver={dragOver}>
      <h3>Lesson Notes: ({notesState.totalNotes})</h3>
      <p>
        {notesState.notes.length
          ? `Last note created: ${notesState.lastNoteCreated}`
          : " "}
      </p>

      <form className="note-form" onSubmit={addNote}>
        <textarea
          placeholder="Create a new note..."
          value={noteInput}
          onChange={(event) => setNoteInput(event.target.value)}
        ></textarea>
        <button>Add</button>
      </form>

      {notesState.notes.map((note) => (
        <div
          className="note"
          style={{ transform: `rotate(${note.rotate}deg)` }}
          onDragEnd={dropNote}
          draggable="true"
          key={note.id}
          id={note.noteInput}
        >
          <div
            onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}
            className="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            onClick={() => dispatch({ type: "DOWNLOAD_NOTE", payload: note })}
            className="download"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </div>

          <pre className="text">{note.text}</pre>
        </div>
      ))}
    </div>
  );
}

export default Notes;
