//roda no browser
"use client"

//hook que permite na navegar entre pages
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

    //função q vai para o profile
  function goToProfile() {
    router.push("/profile")
  }

  return (
    <div>

      <div className="flex items-center gap-4 mt-10 ml-16">

        <img
          src="/me.jpg"
          onClick={goToProfile}
          className="w-[100px] h-[100px] rounded-full border-4 border-[#D84E7C] object-cover cursor-pointer"
        />

        <div>
          <h2 className="text-[26px] m-0">
            Hi, Nena!
          </h2>

          <p className="text-gray-500 m-0">
            nenacpacheco07@gmail.com
          </p>
        </div>

      </div>

      <div className="mt-24 text-center text-gray-500 text-lg">
        Ainda estamos trabalhando nisso.
      </div>

    </div>
  )
}