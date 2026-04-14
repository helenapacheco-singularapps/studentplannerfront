"use client"

import { useRouter } from "next/navigation"
import { CirclePlus } from "lucide-react"
import DisciplineCard from "../components/DisciplineCard"
import EditDisciplineModal from "../components/EditDisciplineModal"
import DeleteDisciplineModal from "../components/DeleteDisciplineModal"
import AddDisciplineModal from "../components/AddDisciplineModal"
import WorkloadCard from "../components/WorkloadCard"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addDiscipline,
  getDisciplines,
  deleteDiscipline,
  type Discipline,
  updateDiscipline,
} from "../services/api"

function getNextSemester(current: string) {
  const [year, sem] = current.split("/").map(Number)
  if (sem === 1) return `${year}/2`
  return `${year + 1}/1`
}

export default function DashboardPage() {
  const router = useRouter()
  const queryClient = useQueryClient()


  const [profile, setProfile] = useState<Record<string, unknown> | null>(null)
  const [nickname, setNickname] = useState("Nena")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("profile")
    const parsed = saved ? JSON.parse(saved) : {}

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(parsed)
    setNickname(parsed.nickname || "Nena")
    setEmail(parsed.email || "")
  }, [])

  const currentSemester = profile?.semester as string | undefined
  const nextSemester = currentSemester
    ? getNextSemester(currentSemester)
    : null

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data: disciplines, isLoading, error } = useQuery({
    queryKey: ["disciplines"],
    queryFn: getDisciplines,
  })

  const addMutation = useMutation({
    mutationFn: addDiscipline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] })
      setIsAddModalOpen(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDiscipline,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] })
      setIsSuccessModalOpen(true)
    },
  })

  const updateMutation = useMutation<
    unknown,
    Error,
    { id: string; data: { status: string } }
  >({
    mutationFn: ({ id, data }) => updateDiscipline(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] })
    },
  })

  function goToProfile() {
    router.push("/profile")
  }

  function handleEdit(discipline: Discipline) {
    setSelectedDiscipline(discipline)
    setIsModalOpen(true)
  }

  function handleDelete(discipline: Discipline) {
    setSelectedDiscipline(discipline)
    setIsDeleteModalOpen(true)
  }

  
  if (!profile) {
    return <p className="mt-10 ml-16">Carregando perfil...</p>
  }

  const inProgress = disciplines?.filter((d) => {
    if (!currentSemester) return d.status === "EM_ANDAMENTO"

    return (
      d.status === "EM_ANDAMENTO" &&
      d.semester === currentSemester
    )
  })

  const planned = disciplines?.filter((d) => {
    if (!currentSemester) return d.status === "PLANEJADA"

    return (
      d.status === "PLANEJADA" &&
      d.semester === nextSemester
    )
  })

  const TOTAL_DISCIPLINES = 56

  const completed =
    disciplines?.filter((d) => d.status === "CONCLUIDA").length || 0

  const inProgressCount =
    disciplines?.filter((d) => d.status === "EM_ANDAMENTO").length || 0

  const plannedCount =
    disciplines?.filter((d) => d.status === "PLANEJADA").length || 0

  const remaining = TOTAL_DISCIPLINES - completed
  const progress = Math.round((completed / TOTAL_DISCIPLINES) * 100)

  return (
    <div>
      <div className="flex items-center gap-3 mt-6 ml-16">
        <Image
          src="/me.jpg"
          alt="Profile"
          width={85}
          height={85}
          onClick={goToProfile}
          className="rounded-full border-4 border-pink object-cover cursor-pointer"
        />
        <div>
          <h2 className="text-[22px] m-0">Hi, {nickname}!</h2>
          <p className="text-gray-500 text-sm m-0">{email}</p>
        </div>
      </div>

      <div className="mt-7 ml-16 flex gap-6">
        <div className="w-250 h-60 rounded-xl p-8 border-2 border-pink">
          <div className="flex justify-between">
            <h3 className="text-xl mb-6 font-semibold text-pink">
              Disciplinas em andamento
            </h3>
            <CirclePlus
              size={30}
              className="text-pink cursor-pointer"
              onClick={() => setIsAddModalOpen(true)}
            />
          </div>

          {!currentSemester && (
            <p className="text-sm text-gray-400 mb-2">
              Defina seu semestre no perfil para melhor organização
            </p>
          )}

          <div className="flex gap-6 flex-wrap">
            {isLoading && <p>Carregando...</p>}
            {error && <p>Erro ao carregar</p>}

            {inProgress?.map((disc) => (
              <DisciplineCard
                key={disc.id}
                discipline={disc}
                size="md"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        <WorkloadCard
          percentage={progress}
          completed={completed}
          inProgress={inProgressCount}
          planned={plannedCount}
          remaining={remaining}
        />
      </div>

      <div className="flex mt-6 ml-16 gap-10">
        <div className="w-100 h-60 rounded-xl p-8 border-2 border-pink flex flex-col justify-between">
          <h3 className="text-xl font-semibold text-pink leading-snug">
            Visualizar todas as disciplinas do curso e seu status
          </h3>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/disciplines")}
              className="bg-pink text-white px-10 py-2 rounded-lg"
            >
              VISUALIZAR
            </button>
          </div>
        </div>

        <div className="w-225 h-60 rounded-xl p-8 border-2 border-pink">
          <h3 className="text-xl mb-8 font-semibold text-pink">
            Planejamento disciplinas próximo semestre
          </h3>

          <div className="flex gap-6 flex-wrap">
            {planned?.map((disc) => (
              <DisciplineCard
                key={disc.id}
                discipline={disc}
                size="sm"
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
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

      <DeleteDisciplineModal
        isOpen={isDeleteModalOpen}
        isSuccessOpen={isSuccessModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (!selectedDiscipline) return
          deleteMutation.mutate(selectedDiscipline.id)
          setIsDeleteModalOpen(false)
        }}
        onSuccessClose={() => setIsSuccessModalOpen(false)}
      />

      <AddDisciplineModal
        key={isAddModalOpen ? "open" : "closed"}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => addMutation.mutate(data)}
      />
    </div>
  )
}