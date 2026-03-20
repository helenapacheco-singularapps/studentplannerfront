import { X } from "lucide-react"

type Props = {
    isOpen: boolean
    isSuccessOpen: boolean
    onClose: () => void
    onConfirm: () => void
    onSuccessClose: () => void
}

export default function DeleteDisciplineModal({
    isOpen,
    isSuccessOpen,
    onClose,
    onConfirm,
    onSuccessClose,
}: Props) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-white rounded-xl p-6 w-105 relative">

                        <button
                            onClick={onClose}
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
                                onClick={onClose}
                                className="bg-pinkly px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onConfirm}
                                className="bg-pink text-white px-4 py-2 rounded"
                            >
                                Confirm
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {isSuccessOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div className="bg-white rounded-xl p-6 w-105 relative">

                        <button
                            onClick={onSuccessClose}
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
                                onClick={onSuccessClose}
                                className="bg-pinkly px-4 py-2 rounded"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    )
}