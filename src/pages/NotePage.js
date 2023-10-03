import { useParams } from "react-router-dom";
//import notes from "../assets/data";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { useState, useEffect } from "react";

const NotePage = () => {
  const [note, setNote] = useState([]);
  const noteId = useParams().id;

  //const note = notes.find((note) => note.id === Number(noteId));

  useEffect(() => {
    getNote();
  }, [noteId]);

  const getNote = async () => {
    if (noteId === "new") return;
    const res = await fetch("http://localhost:5000/notes/" + noteId);
    const data = await res.json();
    setNote(data);
  };

  const updateNote = async () => {
    await fetch("http://localhost:5000/notes/" + noteId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const createNote = async () => {
    await fetch("http://localhost:5000/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const deleteNote = async () => {
    await fetch("http://localhost:5000/notes/" + noteId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const handleSubmit = () => {
    if (noteId !== "new" && !note.body) {
      deleteNote();
    } else if (noteId !== "new") {
      updateNote();
    } else if (noteId === "new" && note !== null) {
      createNote();
    }
    //updateNote();
    //navigate("/");
  };

  console.log(note.body);
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}></ArrowLeft>
          </Link>
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        name=""
        value={note?.body}
        id=""
        cols="30"
        rows="10"
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}></textarea>
    </div>
  );
};

export default NotePage;
