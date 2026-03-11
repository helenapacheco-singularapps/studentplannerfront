
"use client"
import { useRouter } from "next/navigation"
import { Montserrat, Poppins } from "next/font/google"

//cria um obj que aplica essa fonte
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function LoginPage() {
  const router = useRouter()

  //usuário clica no botão/ handleLogin executa, router roda e Next muda a rota
  function handleLogin() {
    router.push("/dashboard")
  }

  return (
    <div className="flex justify-center mt-24">
      <div className="w-[350px]">

        <h1
          className={`${montserrat.className} text-center mb-10 text-[40px]`}
        >
          Sign in
        </h1>

        <label className={poppins.className}>E-mail</label>
        <input
          type="email"
          placeholder="Type your E-mail"
          className="w-full p-3 mt-1 mb-5 bg-gray-200 border-none"
        />

        <label className={poppins.className}>Password</label>
        <input
          type="password"
          placeholder="Type your password"
          className="w-full p-3 mt-1 mb-5 bg-gray-200 border-none"
        />

        <button
          onClick={handleLogin}
          className={`${montserrat.className} w-full p-3 mt-3 bg-[#E85A8A] text-white rounded-md font-bold cursor-pointer`}
        >
          Enter
        </button>

        <button
          className={`${montserrat.className} w-full p-3 mt-3 bg-white text-[#E85A8A] border border-[#E85A8A] rounded-md font-bold cursor-pointer`}
        >
          Register
        </button>

      </div>
    </div>
  )
}


 