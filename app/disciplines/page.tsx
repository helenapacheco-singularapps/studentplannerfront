"use client"

import { useRouter } from "next/navigation"

export default function DisciplinesPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">

            <h1 className="text-3xl font-semibold text-pink">
                Página de disciplinas
            </h1>

            <p className="text-gray-500">
                Em construção
            </p>

            <button
                onClick={() => router.push("/dashboard")}
                className="bg-pink text-white px-6 py-2 rounded"
            >
                Voltar
            </button>

        </div>
    )
}