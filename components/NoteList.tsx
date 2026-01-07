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
}

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No notes yet. Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {note.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(note)}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-900 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-3">
            {note.content}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Created: {formatDate(note.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
