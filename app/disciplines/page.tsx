"use client"

import { useRouter } from "next/navigation"
import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getDisciplines, type Discipline } from "../services/api"

function StatusTag({ status }: { status: string }) {
    const styles = {
        "CONCLUIDA": "bg-green-100 text-green-600",
        "EM_ANDAMENTO": "bg-pinkly text-pink",
        "PLANEJADA": "text-pink border border-pink",
    }

    return (
        <span className={`text-xs px-2 py-1 rounded ${styles[status as keyof typeof styles]}`}>
            {status}
        </span>
    )
}

export default function DisciplinesPage() {
    const router = useRouter()

    const { data: disciplines, isLoading, error } = useQuery({
        queryKey: ["disciplines"],
        queryFn: getDisciplines,
    })

    // Agrupando por semestre
   const semesters: Record<string, Discipline[]> = disciplines?.reduce(
  (acc: Record<string, Discipline[]>, d: Discipline) => {
    const sem = d.semester || "Sem semestre definido";
    if (!acc[sem]) acc[sem] = [];
    acc[sem].push(d);
    return acc;
  },
  {} as Record<string, Discipline[]>
) ?? {};

    if (isLoading) return <p>Carregando disciplinas...</p>
    if (error) return <p>Erro ao carregar disciplinas.</p>

    const semesterKeys = Object.keys(semesters || {})

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <div className="flex flex-1 items-center justify-center gap-6 px-6">

                <button className="text-pink hover:scale-110 transition">
                    <CircleArrowLeft size={36} />
                </button>

                {semesterKeys.map((semKey, index) => (
                    <div
                        key={index}
                        className="bg-white border-[1.21px] border-pink rounded-[12.15px] w-75 h-120 p-4 shadow-sm"
                    >
                        <h2 className="text-pink font-semibold mb-4">
                            {semKey}
                        </h2>

                        <div className="flex flex-col gap-3">
                            {semesters[semKey].map((sub: Discipline) => (
                                <div key={sub.id} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-800 font-semibold truncate flex-1 min-w-0 mr-2">
                                        {sub.name}
                                    </span>
                                    <StatusTag status={sub.status} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="text-pink hover:scale-110 transition">
                    <CircleArrowRight size={36} />
                </button>

            </div>

            <div className="flex justify-center pb-15">
                <button
                    onClick={() => router.push("/dashboard")}
                    className="bg-pink text-white px-10 py-2 rounded-lg"
                >
                    Voltar ao Dashboard
                </button>
            </div>

        </div>
    )
}