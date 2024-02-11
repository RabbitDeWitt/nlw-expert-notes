'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

const NewNoteCard = () => {
  const [showOnboarding, setShowOnboarding] = useState<Boolean>(false)
  const [note, setNote] = useState('')

  const handleStartEditor = () => {
    setShowOnboarding(true)
    setNote('')
  }

  const handleClose = () => {
    setShowOnboarding(false)
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value)
    if (e.target.value === '') {
      setShowOnboarding(false)
    }
  }

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault()

    console.log(note)
    toast.success("Nota criada com sucesso!!!")
    setNote('')
    setShowOnboarding(false)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200 ">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 inset-0 fixed' />
        <Dialog.Content className='fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>

          <Dialog.Close
            className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'
            onClick={handleClose}
          >
            <X className='size-5' />
          </Dialog.Close>

          <form
            onSubmit={handleSaveNote}
            className='flex flex-1 flex-col gap-3'
          >

            <div className="flex flex-1 flex-col p-5 gap-3">
              <span className='text-sm font-medium text-slate-200'>
                Adicionar nota
              </span>
              {showOnboarding ? (
                <textarea
                  autoFocus
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChange}
                />
              ) : (
                <p className='text-sm font-medium text-slate-400 leading-6'>
                  Comece <button className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium outline-none hover:bg-lime-500'>
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default NewNoteCard