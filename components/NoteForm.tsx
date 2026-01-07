"use client";

import { useState, useEffect } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteFormProps {
  onSave: () => void;
  editingNote: Note | null;
  onCancelEdit: () => void;
}

export default function NoteForm({ onSave, editingNote, onCancelEdit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      if (editingNote) {
        await fetch(`/api/notes/${editingNote._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      } else {
        await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      }
      setTitle("");
      setContent("");
      onSave();
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full max-w-md px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg 
                   text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="flex-1 w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg 
                   text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                   resize-none min-h-[300px]"
        required
      />

      <div className="flex items-center mt-4">
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Saving..." : editingNote ? "Update Note" : "Add Note"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
