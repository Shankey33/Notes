import NotesContainer from "@/components/NotesContainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          📝 Notes App
        </h1>
        <NotesContainer />
      </div>
    </main>
  );
}
