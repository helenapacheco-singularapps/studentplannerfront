import { Pencil, Trash2 } from "lucide-react"
import { Discipline } from "../services/api"

type Props = {
  discipline: Discipline
  size?: "sm" | "md"
  onEdit: (discipline: Discipline) => void
  onDelete: (discipline: Discipline) => void
}

export default function DisciplineCard({ discipline, size = "md", onEdit, onDelete }: Props) {
  const isSmall = size === "sm"

  return (
    <div
      className={
        "bg-gray-200 rounded-xl p-4 flex flex-col " +
        (isSmall
          ? "w-28 h-28 justify-between" 
          : "w-32.5 h-32.5 justify-between")
      }
    >
      <div className="flex justify-between text-pink">
        <Pencil
          size={isSmall ? 12 : 15}
          className="cursor-pointer"
          onClick={() => onEdit(discipline)}
        />
        <Trash2
          size={isSmall ? 12 : 15}
          className="cursor-pointer"
          onClick={() => onDelete(discipline)}
        />
      </div>

      <div className="text-center w-full">
        <h3
          className={
            "text-black font-semibold leading-tight line-clamp-2 " +
            (isSmall ? "text-xs" : "text-sm")
          }
        >
          {discipline.name}
        </h3>

        <p
          className={
            "text-black mt-1 " +
            (isSmall ? "text-[10px]" : "text-xs")
          }
        >
          Ver desempenho
        </p>
      </div>
    </div>
  )
}