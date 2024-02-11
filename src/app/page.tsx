'use client'

import { NlwExpertLogo } from "./assets/NlwExpertLogo";
import { NewNoteCard, NoteCard } from "./components";
import { Toaster } from 'sonner'
import { ChangeEvent, useState } from "react";

type Note = {
  id: string,
  date: Date,
  content: string,
}

export default function Home() {
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    return notesOnStorage ? [...JSON.parse(notesOnStorage)] : []
  })

  const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))

  const onNoteCreated = (content: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      date: new Date(),
      content: content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const onNoteDelete = (id: string) => {
    const notesArray = notes.filter(note => note.id !== id)

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearch(query)
  }

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6 px-5 lg:px-0">
      <NlwExpertLogo />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          value={search}
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard
          onNoteCreated={onNoteCreated}
        />

        {filteredNotes.map((note, i) => (
          <NoteCard
            key={i}
            note={note}
            onNoteDelete={onNoteDelete}
          />
        ))}

      </div>
      <Toaster richColors />
    </main >
  );
}
