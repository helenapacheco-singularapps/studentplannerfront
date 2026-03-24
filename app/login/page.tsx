"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Montserrat, Poppins } from "next/font/google"

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

  // estados
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleLogin() {
    setError("")

    // validação
    if (!email || !password) {
      setError("Preencha todos os campos.")
      return
    }


    router.push("/dashboard")
  }

  return (
    <div className="flex justify-center mt-24">
      <div className="w-87.5">

        <h1 className={`${montserrat.className} text-center mb-10 text-[40px]`}>
          Sign in
        </h1>

        <label className={poppins.className}>E-mail</label>
        <input
          type="email"
          placeholder="Type your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mt-1 mb-5 bg-gray-200 border-none"
        />

        <label className={poppins.className}>Password</label>
        <input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mt-1 mb-2 bg-gray-200 border-none"
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className={`${montserrat.className} w-full p-3 mt-3 bg-pink text-white rounded-md font-bold cursor-pointer`}
        >
          Enter
        </button>

        <button
          className={`${montserrat.className} w-full p-3 mt-3 bg-white text-pink border border-pink rounded-md font-bold cursor-pointer`}
        >
          Register
        </button>

      </div>
    </div>
  )
}