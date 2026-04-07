"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CircleArrowLeft, CircleArrowRight, Pencil } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import {
  getDisciplines,
  updateDiscipline,
  type Discipline
} from "../services/api"

import EditDisciplineModal from "../components/EditDisciplineModal"

function StatusTag({ status }: { status: string }) {
  const styles = {
    CONCLUIDA: "bg-green-100 text-green-600",
    EM_ANDAMENTO: "bg-pinkly text-pink",
    PLANEJADA: "text-pink border border-pink",
  }

  return (
    <span className={`text-xs px-2 py-1 rounded ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  )
}

export default function DisciplinesPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: disciplines, isLoading, error } = useQuery({
    queryKey: ["disciplines"],
    queryFn: getDisciplines,
  })


  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Discipline> }) =>
      updateDiscipline(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] })
    },
  })

 
  const semesters: Record<string, Discipline[]> = disciplines?.reduce(
    (acc: Record<string, Discipline[]>, d: Discipline) => {
      const sem = d.semester || "Sem semestre definido"
      if (!acc[sem]) acc[sem] = []
      acc[sem].push(d)
      return acc
    },
    {}
  ) ?? {}

  if (isLoading) return <p>Carregando disciplinas...</p>
  if (error) return <p>Erro ao carregar disciplinas.</p>


  const semesterKeys = Object.keys(semesters).sort((a, b) => {
    const [yearA, semA] = a.split("/").map(Number)
    const [yearB, semB] = b.split("/").map(Number)

    if (yearA !== yearB) return yearA - yearB
    return semA - semB
  })

  function handleEdit(discipline: Discipline) {
    setSelectedDiscipline(discipline)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1 items-center justify-center gap-6 px-6">

        <button className="text-pink hover:scale-110 transition">
          <CircleArrowLeft size={36} />
        </button>

        {semesterKeys.map((semKey, index) => (
          <div
            key={index}
            className="bg-white border-[1.21px] border-pink rounded-[12.15px] w-75 h-120 p-4 shadow-sm"
          >
            <h2 className="text-pink font-semibold mb-4">
              {semKey}
            </h2>

            <div className="flex flex-col gap-3">
              {semesters[semKey].map((sub: Discipline) => (
                <div
                  key={sub.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-800 font-semibold truncate flex-1 min-w-0 mr-2">
                    {sub.name}
                  </span>

                  <div className="flex items-center gap-2">
                  
                    <button
                      onClick={() => handleEdit(sub)}
                      className="text-pink hover:scale-110 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <StatusTag status={sub.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="text-pink hover:scale-110 transition">
          <CircleArrowRight size={36} />
        </button>
      </div>

      <div className="flex justify-center pb-15">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-pink text-white px-10 py-2 rounded-lg"
        >
          Voltar ao Dashboard
        </button>
      </div>

      <EditDisciplineModal
        isOpen={isModalOpen}
        discipline={selectedDiscipline}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (!selectedDiscipline) return

          updateMutation.mutate({
            id: selectedDiscipline.id,
            data,
          })

          setIsModalOpen(false)
        }}
      />
    </div>
  )
}