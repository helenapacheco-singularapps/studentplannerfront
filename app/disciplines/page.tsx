"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CircleArrowLeft,
  CircleArrowRight,
  CirclePlus,
  Trash2,
} from "lucide-react"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import AddDisciplineModal from "../components/AddDisciplineModal"
import EditDisciplineModal from "../components/EditDisciplineModal"
import DeleteDisciplineModal from "../components/DeleteDisciplineModal"

import {
  getDisciplines,
  updateDiscipline,
  deleteDiscipline,
  addDiscipline,
  type Discipline,
} from "../services/api"

function StatusTag({ status }: { status: string }) {
  const styles = {
    CONCLUIDA: "bg-green-100 text-green-600",
    EM_ANDAMENTO: "bg-pinkly text-pink",
    PLANEJADA: "text-pink border border-pink",
  }

  return (
    <span
      className={`text-xs px-2 py-1 rounded ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  )
}

export default function DisciplinesPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteSuccessOpen, setIsDeleteSuccessOpen] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const ITEMS_PER_PAGE = 4

  const { data: disciplines, isLoading, error } = useQuery({
    queryKey: ["disciplines"],
    queryFn: getDisciplines,
  })

 const updateMutation = useMutation({
  mutationFn: ({
    id,
    data,
  }: {
    id: string
    data: Partial<Discipline>
  }) => updateDiscipline(id, data),

  onSuccess: (_, variables) => {
    queryClient.setQueryData(["disciplines"], (old: Discipline[] = []) => {
      return old.map((d) => {
        if (d.id !== variables.id) return d

        return {
          ...d,
          ...variables.data,
          semester: variables.data.semester?.trim() ?? d.semester,
        }
      })
    })
  },
})

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDiscipline(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] })
    },
  })

  const addMutation = useMutation({
    mutationFn: addDiscipline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] })
      setIsAddModalOpen(false)
    },
    onError: () => {
      alert("Erro ao adicionar disciplina.")
    },
  })

  const semesters: Record<string, Discipline[]> =
    disciplines?.reduce(
      (acc: Record<string, Discipline[]>, d: Discipline) => {
        const sem = d.semester?.trim() || "Sem semestre definido"
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

  const visibleSemesters = semesterKeys.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  )

  function handleEdit(discipline: Discipline) {
    setSelectedDiscipline(discipline)
    setIsModalOpen(true)
  }

  function handleDelete(discipline: Discipline) {
    setSelectedDiscipline(discipline)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full px-10 pt-4 flex justify-end">
        <CirclePlus
          size={35}
          className="text-pink cursor-pointer hover:scale-110 transition"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <div className="flex flex-1 items-center justify-center gap-6 px-6">
        
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              Math.max(prev - ITEMS_PER_PAGE, 0)
            )
          }
          disabled={currentIndex === 0}
          className="text-pink hover:scale-110 transition disabled:opacity-30"
        >
          <CircleArrowLeft size={36} />
        </button>

        {visibleSemesters.map((semKey, index) => (
          <div
            key={index}
            className="bg-white border border-pink rounded-xl w-72 h-120 p-4 shadow-sm"
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
                  <span
                    onClick={() => handleEdit(sub)}
                    className="text-gray-800 font-semibold truncate flex-1 mr-2 cursor-pointer hover:underline"
                  >
                    {sub.name}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(sub)}
                      className="text-pink hover:scale-110 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    <StatusTag status={sub.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              Math.min(
                prev + ITEMS_PER_PAGE,
                Math.max(0, semesterKeys.length - ITEMS_PER_PAGE)
              )
            )
          }
          disabled={currentIndex + ITEMS_PER_PAGE >= semesterKeys.length}
          className="text-pink hover:scale-110 transition disabled:opacity-30"
        >
          <CircleArrowRight size={36} />
        </button>
      </div>

      <div className="flex justify-center pb-10">
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
        console.log("Data to save:", data)
  if (!selectedDiscipline) return

  updateMutation.mutate(
    {
      id: selectedDiscipline.id,
      data,
    },
    {
      onSuccess: () => {
        console.log("Disciplina atualizada com sucesso!")
        setIsModalOpen(false)
      },
    }
  )
}}
      />

      <AddDisciplineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => addMutation.mutate(data)}
      />

      <DeleteDisciplineModal
        isOpen={isDeleteModalOpen}
        isSuccessOpen={isDeleteSuccessOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccessClose={() => setIsDeleteSuccessOpen(false)}
        onConfirm={() => {
          if (!selectedDiscipline) return

          deleteMutation.mutate(selectedDiscipline.id, {
            onSuccess: () => {
              setIsDeleteModalOpen(false)
              setIsDeleteSuccessOpen(true)
            },
          })
        }}
      />
    </div>
  )
}