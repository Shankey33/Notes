"use client";

import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesContainer() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = () => {
    setEditingNote(null);
    setIsCreating(false);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setSelectedNote(note);
    setIsCreating(false);
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setEditingNote(note);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      if (selectedNote?._id === id) {
        setSelectedNote(null);
        setEditingNote(null);
      }
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setSelectedNote(null);
    setIsCreating(false);
  };

  const handleNewNote = () => {
    setIsCreating(true);
    setEditingNote(null);
    setSelectedNote(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-73px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-400">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Left Sidebar - Notes List */}
      <div className="w-96 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        {/* Search and Add */}
        <div className="p-4 flex gap-2">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg 
                       text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleNewNote}
            className="p-2 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          <NoteList
            notes={filteredNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelect={handleSelectNote}
            selectedNoteId={selectedNote?._id || null}
          />
        </div>
      </div>

      {/* Right Side - Note Form/Editor */}
      <div className="flex-1 bg-neutral-900 p-6">
        {isCreating || editingNote ? (
          <NoteForm
            onSave={handleSave}
            editingNote={editingNote}
            onCancelEdit={handleCancelEdit}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Select a note or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
