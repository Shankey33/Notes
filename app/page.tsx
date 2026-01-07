import NotesContainer from "@/components/NotesContainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-xl font-semibold">Notes App</h1>
        </div>
      </header>
      <NotesContainer />
    </main>
  );
}
