// import notes from "../assets/data.js";
import ListItem from "../components/ListItem.js";
import { useEffect, useState } from "react";
import AddButton from "../components/AddButton.js";
function NoteListPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const res = await fetch("http://localhost:5000/notes/");
    const data = await res.json();
    setNotes(data);
  };
  return (
    <div className="note">
      <div className="notes-header">
        <h2 className="notes-title">&#9782;Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  );
}

export default NoteListPage;
