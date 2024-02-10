'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow as ftdn } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'
type Props = {
  note: {
    date: Date,
    content: string
  }
}

const NoteCard = ({ note }: Props) => {
  const { date, content } = note
  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left flex flex-col gap-3 bg-slate-800 p-5 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'>
        <span className='text-sm font-medium text-slate-200'>
          {ftdn(date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className='text-sm font-medium text-slate-400 leading-6'>
          {content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 inset-0 fixed' />
        <Dialog.Content className='fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>

          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>
          <div className="flex flex-1 flex-col p-5 gap-3">
            <span className='text-sm font-medium text-slate-200'>
              {ftdn(date, { locale: ptBR, addSuffix: true })}
            </span>
            <p className='text-sm font-medium text-slate-400 leading-6'>
              {content}
            </p>
          </div>

          <button className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 font-medium outline-none group'>
            Deseja <span className='text-red-400 group-hover:underline '>
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default NoteCard