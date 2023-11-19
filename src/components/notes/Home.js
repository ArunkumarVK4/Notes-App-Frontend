import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { TextField, Button, Grid } from "@material-ui/core";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("https://notes-zb6a.onrender.com/api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`https://notes-zb6a.onrender.com/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };

  const handleSearch = () => {
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item className="search-container">
        <TextField
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSearch}>
          Search
        </Button>
      </Grid>

      <Grid item className="note-wrapper">
        {notes.map((note) => (
          <div className="card" key={note._id}>
            <h4 title={note.title}>{note.title}</h4>
            <div className="text-wrapper">
              <p>{note.content}</p>
            </div>
            <p className="date">deadline {format(note.date)}</p>
            <div className="card-footer">
              <Link to={`edit/${note._id}`}>
                <EditIcon />
              </Link>
            </div>
            <button className="delete" onClick={() => deleteNote(note._id)}>
              <DeleteIcon />
            </button>
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
