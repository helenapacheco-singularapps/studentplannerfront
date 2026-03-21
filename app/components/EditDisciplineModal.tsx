import { X } from "lucide-react"

type Props = {
    isOpen: boolean
    discipline: string | null
    onClose: () => void
}

export default function EditDisciplineModal({ isOpen, discipline, onClose }: Props) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-xl p-8 w-125 relative">

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-semibold text-pink mb-6">
                    {discipline}
                </h2>

                <div className="flex flex-col gap-4">
                    <input className="bg-gray-100 rounded p-2" placeholder="Prova 1" />
                    <input className="bg-gray-100 rounded p-2" placeholder="Prova 2" />
                    <input className="bg-gray-100 rounded p-2" placeholder="Trabalho 1" />
                    <input className="bg-gray-100 rounded p-2" placeholder="Trabalho 2" />
                    <input className="bg-gray-100 rounded p-2" placeholder="Recuperação (se aplicável)" />
                    <input className="bg-gray-100 rounded p-2" placeholder="Status da disciplina" />
                </div>

                <div className="flex justify-end gap-4 mt-6">

                    <button
                        onClick={onClose}
                        className="bg-pinkly px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-pink text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>
    )
}