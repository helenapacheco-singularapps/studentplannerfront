//roda no browser
"use client"

//hook que permite na navegar entre pages
import { useRouter } from "next/navigation"
import { CirclePlus, X } from "lucide-react"
import DisciplineCard from "../components/DisciplineCard"
import { useState } from "react"
import Image from "next/image"


export default function DashboardPage() {
  const router = useRouter()

  //USEEFFECT!!!!!!!!
  const profile =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("profile") || "{}")
      : {}

  const [nickname] = useState(profile.nickname || "Nena")
  const [email] = useState(profile.email || "nenacpacheco07@gmail.com")

  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  //DELETEDISCIPLINE NAO ESTA SENDO USADO!!!!!!!!!!!
  const [deleteDiscipline, setDeleteDiscipline] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  //função q vai para o profile
  function goToProfile() {
    router.push("/profile")
  }

  function handleEdit(name: string) {
    setSelectedDiscipline(name)
    setIsModalOpen(true)
  }

  function handleDelete(name: string) {
    setDeleteDiscipline(name)
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

      {/* COMPONETE!!!!!!!!!!!!*/}
      <div className="mt-7 ml-16">

        <div className=" w-247.5 h-60 rounded-xl p-8  border-2 border-pink">

          <div className="flex justify-between">

            <h3 className="text-xl mb-6 font-semibold text-pink">
              Disciplinas em andamento
            </h3>

            <CirclePlus size={30} className="text-pink cursor-pointer" onClick={() => setIsAddModalOpen(true)} />
          </div>

          <div className="flex gap-6 flex-wrap">

            <DisciplineCard name="Administração da Informação" size={"md"} onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Processos de Software" size={"md"} onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Projeto e Arquitetura de Software" size={"md"} onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Sistemas Operacionais" size={"md"} onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Gerenciamento de Projeto de Software" size={"md"} onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Psicologia E Gestão De Pessoas Em TI" size={"md"} onEdit={handleEdit} onDelete={handleDelete} />

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

            {/* instanciand um componente e passando infos pra ele */}
            <DisciplineCard name="Administração da Informação" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Processos de Software" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Projeto e Arquitetura de Software" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Sistemas Operacionais" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Gerenciamento de Projeto de Software" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
            <DisciplineCard name="Psicologia E Gestão De Pessoas Em TI" size="sm" onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>

      </div>

      {/*renderização condicional COMPONENTE!!!!!!!!!!!!!!!!!!!!!*/}
      {isModalOpen && (

        //fundo escuro overlay
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
                className="bg-pinkly px-4 py-2 rounded"
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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-105 relative">

            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-2">
              Excluir
            </h2>

            <p className="text-gray-500 mb-6">
              Você deseja excluir esta disciplina?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-pinkly px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setIsSuccessModalOpen(true)
                }}
                className="bg-pink text-white px-4 py-2 rounded"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-105 relative">

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-2">
              Sucesso
            </h2>

            <p className="text-gray-500 mb-6">
              A disciplina foi excluída com sucesso!
            </p>

            <div className="flex justify-end">

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="bg-pinkly px-4 py-2 rounded"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-125 relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
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
                <input className="bg-gray-100 rounded p-2 w-full" />
              </div>

              <div>
                <p className="text-sm mb-1">Quantidade de créditos</p>
                <input className="bg-gray-100 rounded p-2 w-full" />
              </div>

              <div>
                <p className="text-sm mb-1">Em qual semestre irá cursar</p>
                <input className="bg-gray-100 rounded p-2 w-full" />
              </div>

            </div>

            <div className="flex justify-end gap-4 mt-6">

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-pinkly px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => setIsAddModalOpen(false)}
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