"use client"

import { X } from "lucide-react"
import { useState } from "react"

type Props = {
    isOpen: boolean
    onClose: () => void
    onSave: (data: {
        name: string
        status: string
        semester: string
    }) => void
}

export default function AddDisciplineModal({ isOpen, onClose, onSave }: Props) {
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [semester, setSemester] = useState("") 

    if (!isOpen) return null

    function handleSave() {
        if (!name || !status || !semester) { 
            alert("Preencha todos os campos")
            return
        }

        onSave({
            name,
            status:
                status === "andamento"
                    ? "EM_ANDAMENTO"
                    : "PLANEJADA",
            semester, 
        })

        setName("")
        setStatus("")
        setSemester("")
        onClose()
    }

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
                    Adicionar nova disciplina
                </h2>

                <div className="flex flex-col gap-4">

                  
                    <div>
                        <p className="text-sm mb-1">Nome da disciplina</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-100 rounded p-2 w-full"
                        />
                    </div>

             <div>
                        <p className="text-sm mb-1">Semestre</p>
                        <input
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            placeholder="Ex: 2026/1"
                            className="bg-gray-100 rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1">Status da disciplina</p>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-100 rounded p-2 w-full"
                        >
                            <option value="">Selecione</option>
                            <option value="andamento">Em andamento</option>
                            <option value="planejado">Planejado</option>
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