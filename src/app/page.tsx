import { NlwExpertLogo } from "./assets/NlwExpertLogo";
import { NewNoteCard, NoteCard } from "./components";

export default function Home() {
  const notes = [
    {
      date: new Date(),
      content: "Nota 1"
    },
    {
      date: new Date(),
      content: "Nota 2"
    },
    {
      date: new Date(),
      content: "Nota 3"
    },
  ]

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6">
      <NlwExpertLogo />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />

        {notes.map((note, i) => (
          <NoteCard
            key={i}
            note={note}
          />
        ))}

      </div>
    </main >
  );
}
