import React from 'react'

type Props = {}

const NoteCard = (props: Props) => {
  return (
    <div className='rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative'>
      <span className='text-sm font-medium text-slate-200'>
        há 4 dias
      </span>
      <p className='text-sm font-medium text-slate-400 leading-6'>
        No app do NLW vamos criar um layout incrível, assim podemos entregar a melhor experiência para a comunidade.

        Na aplicação React vamos criar um projeto que permite o usuário salvar notas em texto ou áudio.
      </p>

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  )
}

export default NoteCard