import { Pencil, Trash2 } from "lucide-react"
import { Discipline } from "../services/api"

type Props = {
  discipline: Discipline
  size?: "sm" | "md"
  onEdit: (discipline: Discipline) => void
  onDelete: (discipline: Discipline) => void
}

export default function DisciplineCard({ discipline, size = "md", onEdit, onDelete }: Props) {
  return (
    <div className={
      "bg-gray-200 rounded-xl p-4 flex flex-col justify-between " +
      (size === "md" ? "w-32.5 h-32.5" : "w-25 h-25")
    }>
      <div className="flex justify-between text-pink">
        <Pencil size={15} className="cursor-pointer" onClick={() => onEdit(discipline)} />
        <Trash2 size={15} className="cursor-pointer" onClick={() => onDelete(discipline)} />
      </div>

      <div className="text-center w-full">
        <h3 className="text-sm text-black font-semibold leading-tight line-clamp-2">
          {discipline.name}
        </h3>
        <p className="text-xs text-black mt-1">
          Ver desempenho
        </p>
      </div>
    </div>
  )
}