//roda no browser
"use client"

//hook que permite na navegar entre pages
import { useRouter } from "next/navigation"
import { CirclePlus } from "lucide-react"
import Image from "next/image";
import DisciplineCard from "../components/DisciplineCard"
//component

export default function DashboardPage() {
  const router = useRouter()

  //função q vai para o profile
  function goToProfile() {
    router.push("/profile")
  }

  return (
    <div>

      <div className="flex items-center gap-3 mt-6 ml-16">

        <img
          src="/me.jpg"
          onClick={goToProfile}
          className="w-[85px] h-[85px] rounded-full border-4 border-pink object-cover cursor-pointer"
        />

        <div>
          <h2 className="text-[22px] m-0">
            Hi, Nena!
          </h2>

          <p className="text-gray-500 text-sm m-0">
            nenacpacheco07@gmail.com
          </p>
        </div>

      </div>


      <div className="mt-7 ml-16">

        <div className=" w-[990px] h-[240px] rounded-[12px] p-8  border-2 border-pink">

          <div className="flex justify-between">

            <h3 className="text-xl mb-6 font-semibold text-pink">
              Disciplinas em andamento
            </h3>

            <CirclePlus size={30} className="text-pink" />
          </div>

          <div className="flex gap-6 flex-wrap">

            <DisciplineCard name="Administração da Informação" />

            <DisciplineCard name="Processos de Software" />

            <DisciplineCard name="Projeto e Arquitetura de Software" />

            <DisciplineCard name="Sistemas Operacionais" />

            <DisciplineCard name="Gerenciamento de Projeto de Software" />

            <DisciplineCard name="Psicologia E Gestão De Pessoas Em TI" />

          </div>
        </div>
      </div>

    </div>
  )
}