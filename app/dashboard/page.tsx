"use client"

import { useRouter } from "next/navigation"
import { CirclePlus } from "lucide-react"
import DisciplineCard from "../components/DisciplineCard"
import EditDisciplineModal from "../components/EditDisciplineModal"
import DeleteDisciplineModal from "../components/DeleteDisciplineModal"
import AddDisciplineModal from "../components/AddDisciplineModal"
import { useState } from "react"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()

  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const [nickname] = useState(() => {
    if (typeof window === "undefined") return "Nena"
    const profile = JSON.parse(localStorage.getItem("profile") || "{}")
    return profile.nickname || "Nena"
  })

  const [email] = useState(() => {
    if (typeof window === "undefined") return "nenacpacheco07@gmail.com"
    const profile = JSON.parse(localStorage.getItem("profile") || "{}")
    return profile.email || "nenacpacheco07@gmail.com"
  })

  function goToProfile() {
    router.push("/profile")
  }

  function handleEdit(name: string) {
    setSelectedDiscipline(name)
    setIsModalOpen(true)
  }

  function handleDelete(name: string) {
    setSelectedDiscipline(name)
    setIsDeleteModalOpen(true)
  }

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
          <h2 className="text-[22px] m-0">
            Hi, {nickname}!
          </h2>

          <p className="text-gray-500 text-sm m-0">
            {email}
          </p>
        </div>

      </div>


      <div className="mt-7 ml-16">

        <div className="w-247.5 h-60 rounded-xl p-8 border-2 border-pink">

          <div className="flex justify-between">

            <h3 className="text-xl mb-6 font-semibold text-pink">
              Disciplinas em andamento
            </h3>

            <CirclePlus size={30} className="text-pink cursor-pointer" onClick={() => setIsAddModalOpen(true)} />
          </div>

          <div className="flex gap-6 flex-wrap">

            <DisciplineCard name="Administração da Informação" size="md" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Processos de Software" size="md" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Projeto e Arquitetura de Software" size="md" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Sistemas Operacionais" size="md" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Gerenciamento de Projeto de Software" size="md" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Psicologia E Gestão De Pessoas Em TI" size="md" onEdit={handleEdit} onDelete={handleDelete} />

          </div>
        </div>
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

        <div className="w-220 h-60 rounded-xl p-8 border-2 border-pink">
          <h3 className="text-xl mb-1 font-semibold text-pink">
            Planejamento disciplinas próximo semestre
          </h3>

          <div className="flex gap-6 flex-wrap">
            <DisciplineCard name="Administração da Informação" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Processos de Software" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Projeto e Arquitetura de Software" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Sistemas Operacionais" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Gerenciamento de Projeto de Software" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Psicologia E Gestão De Pessoas Em TI" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>

      </div>

      <EditDisciplineModal
        isOpen={isModalOpen}
        discipline={selectedDiscipline}
        onClose={() => setIsModalOpen(false)}
      />

      <DeleteDisciplineModal
        isOpen={isDeleteModalOpen}
        isSuccessOpen={isSuccessModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false)
          setIsSuccessModalOpen(true)
        }}
        onSuccessClose={() => setIsSuccessModalOpen(false)}
      />

      <AddDisciplineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  )
}