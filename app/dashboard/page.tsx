//roda no browser
"use client"

//hook que permite na navegar entre pages
import { useRouter } from "next/navigation"
import { CirclePlus, X } from "lucide-react"
import DisciplineCard from "../components/DisciplineCard"
import { useState } from "react"
//component

export default function DashboardPage() {
  const router = useRouter()

  const profile =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("profile") || "{}")
      : {}

  const [nickname] = useState(profile.nickname || "Nena")
  const [email] = useState(profile.email || "nenacpacheco07@gmail.com")

  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  //função q vai para o profile
  function goToProfile() {
    router.push("/profile")
  }

  function handleEdit(name: string) {
    setSelectedDiscipline(name)
    setIsModalOpen(true)
  }

  return (
    <div>

      <div className="flex items-center gap-3 mt-6 ml-16">

        <img
          src="/me.jpg"
          onClick={goToProfile}
          className="w-21.25 h-21.25 rounded-full border-4 border-pink object-cover cursor-pointer"
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

        <div className=" w-247.5 h-60 rounded-xl p-8  border-2 border-pink">

          <div className="flex justify-between">

            <h3 className="text-xl mb-6 font-semibold text-pink">
              Disciplinas em andamento
            </h3>

            <CirclePlus size={30} className="text-pink" />
          </div>

          <div className="flex gap-6 flex-wrap">

            <DisciplineCard name="Administração da Informação" size={"md"} onEdit={handleEdit} />
            <DisciplineCard name="Processos de Software" size={"md"} onEdit={handleEdit} />
            <DisciplineCard name="Projeto e Arquitetura de Software" size={"md"} onEdit={handleEdit} />
            <DisciplineCard name="Sistemas Operacionais" size={"md"} onEdit={handleEdit} />
            <DisciplineCard name="Gerenciamento de Projeto de Software" size={"md"} onEdit={handleEdit} />
            <DisciplineCard name="Psicologia E Gestão De Pessoas Em TI" size={"md"} onEdit={handleEdit} />

          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 mr-16 ">

        <div className="w-200 h-60 rounded-xl p-8 border-2 border-pink">

          <div className="flex justify-between">

            <h3 className="text-xl mb-1 font-semibold text-pink">
              Planejamento disciplinas próximo semestre
            </h3>

          </div>

          <div className="flex gap-6 flex-wrap ">

            <DisciplineCard name="Administração da Informação" size="sm" onEdit={handleEdit} />
            <DisciplineCard name="Processos de Software" size="sm" onEdit={handleEdit} />
            <DisciplineCard name="Projeto e Arquitetura de Software" size="sm" onEdit={handleEdit} />
            <DisciplineCard name="Sistemas Operacionais" size="sm" onEdit={handleEdit} />
            <DisciplineCard name="Gerenciamento de Projeto de Software" size="sm" onEdit={handleEdit} />
            <DisciplineCard name="Psicologia E Gestão De Pessoas Em TI" size="sm" onEdit={handleEdit} />

          </div>

        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-8 w-125 relative">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold text-pink mb-6">
              {selectedDiscipline}
            </h2>

            <div className="flex flex-col gap-4">

              <input className="bg-gray-100 rounded p-2" placeholder="Prova 1" />
              <input className="bg-gray-100 rounded p-2" placeholder="Prova 2" />
              <input className="bg-gray-100 rounded p-2" placeholder="Trabalho 1" />
              <input className="bg-gray-100 rounded p-2" placeholder="Trabalho 2" />
              <input className="bg-gray-100 rounded p-2" placeholder="Recuperação (se aplicável)" />
              <input className="bg-gray-100 rounded p-2" placeholder="Status da discplina" />
            </div>

            <div className="flex justify-end gap-4 mt-6">

              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-pink-200 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-pink text-white px-4 py-2 rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}