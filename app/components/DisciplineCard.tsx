import { Pencil, Trash2 } from "lucide-react"

type Props = {
  name: string
  size: "sm" | "md"
  onEdit: (name: string) => void
  onDelete: (name: string) => void
}

export default function DisciplineCard({ name, size = "md", onEdit, onDelete }: Props) {
  return (
    <div className={`bg-gray-200 rounded-xl p-4 flex flex-col justify-between ${size === "md" ? "w-32.5 h-32.5" : "w-25 h-25"}`}>

      <div className="flex justify-between text-pink">
        <Pencil size={15} className="cursor-pointer" onClick={() => onEdit(name)} />
        <Trash2 size={15} className="cursor-pointer" onClick={() => onDelete(name)} />
      </div>

      <div className="text-center">

        <h3 className="text-sm text-black font-semibold leading-tight">
          {name}
        </h3>

        <p className="text-xs text-black mt-1">
          Ver desempenho
        </p>

      </div>

    </div>
  )
}