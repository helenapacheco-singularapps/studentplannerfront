"use client"

import { X } from "lucide-react"
import { Discipline } from "../services/api"
import { useState, useEffect } from "react"

type Props = {
    isOpen: boolean
    discipline: Discipline | null
    onClose: () => void
    onSave: (data: { status: string; semester: string }) => void
}

export default function EditDisciplineModal({
    isOpen,
    discipline,
    onClose,
    onSave
}: Props) {

    const [prova1, setProva1] = useState("")
    const [prova2, setProva2] = useState("")
    const [trabalho1, setTrabalho1] = useState("")
    const [trabalho2, setTrabalho2] = useState("")
    const [recuperacao, setRecuperacao] = useState("")
    const [status, setStatus] = useState("")
    const [semestre, setSemestre] = useState("")
    const [initialStatus, setInitialStatus] = useState("")
const [initialSemestre, setInitialSemestre] = useState("")


   useEffect(() => {
  if (!discipline) return

  const saved = localStorage.getItem(`discipline-${discipline.id}`)

  const originalStatus = discipline.status || ""
  const originalSemester = discipline.semester || ""

  setStatus(originalStatus)
  setSemestre(originalSemester)

  setInitialStatus(originalStatus)
  setInitialSemestre(originalSemester)

  if (saved) {
    const data = JSON.parse(saved)

    setProva1(data.prova1 || "")
    setProva2(data.prova2 || "")
    setTrabalho1(data.trabalho1 || "")
    setTrabalho2(data.trabalho2 || "")
    setRecuperacao(data.recuperacao || "")

    if (data.semestre) {
      setSemestre(data.semestre)
    }
  } else {
    setProva1("")
    setProva2("")
    setTrabalho1("")
    setTrabalho2("")
    setRecuperacao("")
  }
}, [discipline])
   async function handleSave() {
  if (!discipline) return

 
  if (
    status !== initialStatus &&
    semestre === initialSemestre
  ) {
    alert("Você precisa alterar o semestre junto ao status da disciplina.")
    return
  }

  localStorage.setItem(
    `discipline-${discipline.id}`,
    JSON.stringify({
      prova1,
      prova2,
      trabalho1,
      trabalho2,
      recuperacao,
      semestre
    })
  )

  try {
    const res = await fetch(`/api/disciplines/${discipline.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        semester: semestre
      })
    })

    if (!res.ok) throw new Error("Erro ao atualizar disciplina")

    onSave({
      status,
      semester: semestre
    })

    onClose()
  } catch (err) {
    console.error(err)
    alert("Não foi possível atualizar a disciplina. Tente novamente.")
  }
}

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 w-125 relative">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-semibold text-pink mb-6">
                    {discipline?.name}
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        value={prova1}
                        onChange={(e) => setProva1(e.target.value)}
                        className="bg-gray-100 rounded p-2"
                        placeholder="Prova 1"
                    />

                    <input
                        value={prova2}
                        onChange={(e) => setProva2(e.target.value)}
                        className="bg-gray-100 rounded p-2"
                        placeholder="Prova 2"
                    />

                    <input
                        value={trabalho1}
                        onChange={(e) => setTrabalho1(e.target.value)}
                        className="bg-gray-100 rounded p-2"
                        placeholder="Trabalho 1"
                    />

                    <input
                        value={trabalho2}
                        onChange={(e) => setTrabalho2(e.target.value)}
                        className="bg-gray-100 rounded p-2"
                        placeholder="Trabalho 2"
                    />

                    <input
                        value={recuperacao}
                        onChange={(e) => setRecuperacao(e.target.value)}
                        className="bg-gray-100 rounded p-2"
                        placeholder="Recuperação (se aplicável)"
                    />

                    <input
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        className="bg-gray-100 rounded p-2"
                        placeholder="Semestre"
                    />

                    <div>
                        <p className="text-sm mb-1">Status da disciplina</p>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-100 rounded p-2 w-full"
                        >
                            <option value="">Selecione</option>
                            <option value="PLANEJADA">Planejada</option>
                            <option value="EM_ANDAMENTO">Em andamento</option>
                            <option value="CONCLUIDA">Concluída</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">

                    <button
                        onClick={onClose}
                        className="bg-pinkly px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="bg-pink text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>

                </div>
            </div>
        </div>
    )
}