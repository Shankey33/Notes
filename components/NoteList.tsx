"use client";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onSelect: (note: Note) => void;
  selectedNoteId: string | null;
}

export default function NoteList({ notes, onEdit, onDelete, onSelect, selectedNoteId }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-gray-500">
        <p>No notes yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 px-2">
      {notes.map((note) => (
        <div
          key={note._id}
          onClick={() => onSelect(note)}
          className={`p-3 rounded-lg cursor-pointer transition-colors group
            ${selectedNoteId === note._id 
              ? "bg-neutral-700" 
              : "hover:bg-neutral-800"
            }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white truncate">
                {note.title}
              </h3>
              <p className="text-sm text-gray-400 truncate mt-1">
                {note.content}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note._id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
