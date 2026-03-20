"use client"

import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const semesters = [
    {
        title: "2025/2",
        subjects: [
            { name: "Prática Na Áreas II", status: "Concluída" },
            { name: "Processos de Software", status: "Concluída" },
            { name: "Projeto e Arquitetura de Software", status: "Concluída" },
            { name: "Sistemas Operacionais", status: "Concluída" },
            { name: "Gerenciamento de Projeto de Software", status: "Concluída" },
            { name: "Psicologia e Gestão de Pessoas", status: "Concluída" },
        ],
    },
    {
        title: "2026/1",
        subjects: [
            { name: "Administração da Informação", status: "Cursando" },
            { name: "Processos de Software", status: "Cursando" },
            { name: "Projeto e Arquitetura de Software", status: "Cursando" },
            { name: "Sistemas Operacionais", status: "Cursando" },
            { name: "Gerenciamento de Projeto de Software", status: "Cursando" },
            { name: "Psicologia e Gestão de Pessoas", status: "Cursando" },
        ],
    },
    {
        title: "2026/2",
        subjects: [
            { name: "Administração da Informação", status: "Planejada" },
            { name: "Processos de Software", status: "Planejada" },
            { name: "Projeto e Arquitetura de Software", status: "Planejada" },
            { name: "Sistemas Operacionais", status: "Planejada" },
            { name: "Gerenciamento de Projeto de Software", status: "Planejada" },
            { name: "Psicologia e Gestão de Pessoas", status: "Planejada" },
        ],
    },
    {
        title: "2027/1",
        subjects: [
            { name: "Administração da Informação", status: "Planejada" },
            { name: "Processos de Software", status: "Planejada" },
            { name: "Projeto e Arquitetura de Software", status: "Planejada" },
            { name: "Sistemas Operacionais", status: "Planejada" },
            { name: "Gerenciamento de Projeto de Software", status: "Planejada" },
            { name: "Psicologia e Gestão de Pessoas", status: "Planejada" },
        ],
    },
]

function StatusTag({ status }: { status: string }) {
    const styles = {
        "Concluída": "bg-green-100 text-green-600",
        "Cursando": "bg-pinkly text-pink",
        "Planejada": "text-pink border border-pink",
    }

    return (
        <span className={`text-xs px-2 py-1 rounded ${styles[status as keyof typeof styles]}`}>
            {status}
        </span>
    )
}

export default function DisciplinesPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <div className="flex flex-1 items-center justify-center gap-6 px-6">

                <button className="text-pink hover:scale-110 transition">
                    <CircleArrowLeft size={36} />
                </button>

                {semesters.map((semester, index) => (
                    <div
                        key={index}
                        className="bg-white border-[1.21px] border-pink rounded-[12.15px] w-75 h-120 p-4 shadow-sm"
                    >
                        <h2 className="text-pink font-semibold mb-4">
                            {semester.title}
                        </h2>

                        <div className="flex flex-col gap-3">
                            {semester.subjects.map((sub, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">

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

            <div className="flex justify-center pb-20">
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