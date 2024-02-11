'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  onNoteCreated: (note: string) => void
}

let speechRecognition: SpeechRecognition | null = null

const NewNoteCard = ({ onNoteCreated }: Props) => {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true)
  const [note, setNote] = useState('')

  const [isRecording, setIsRecording] = useState<boolean>(false)

  const handleStartRecording = () => {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    if (!isSpeechRecognitionAPIAvailable) {
      alert("Infelizmente seu navegador não suporta esse ação!")
      return
    }

    setIsRecording(true)
    setShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = e => {
      const transcription = Array.from(e.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      setNote(transcription)
    }

    speechRecognition.onerror = e => {
      console.error(e.error)
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  const handleStartEditor = () => {
    setShowOnboarding(false)
    setNote('')
  }

  const handleClose = () => {
    setShowOnboarding(true)
    setIsRecording(false)
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value)
    if (e.target.value === '') {
      setShowOnboarding(true)
    }
  }

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault()

    if (note === '') {
      return
    }
    onNoteCreated(note)
    toast.success("Nota criada com sucesso!!!")
    setNote('')
    setShowOnboarding(true)
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
            className='flex flex-1 flex-col gap-3'
          >

            <div className="flex flex-1 flex-col p-5 gap-3">
              <span className='text-sm font-medium text-slate-200'>
                Adicionar nota
              </span>
              {!showOnboarding ? (
                <textarea
                  autoFocus
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  value={note}
                  onChange={handleContentChange}
                />
              ) : (
                <p className='text-sm font-medium text-slate-400 leading-6'>
                  Comece <button onClick={handleStartRecording} type='button' className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                </p>
              )}
            </div>



            {isRecording ? (
              <button
                onClick={handleStopRecording}
                type='button'
                className='w-full bg-slate-900 py-4 text-center text-sm text-slate-300 font-medium outline-none hover:text-slate-100 flex items-center justify-center gap-2'>
                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                Gravando (clique p/ interromper)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type='button'
                className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 font-medium outline-none hover:bg-lime-500'>
                Salvar nota
              </button>
            )}

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default NewNoteCard