import { Pencil, Trash2 } from "lucide-react"

type Props = {
  name: string
}

export default function DisciplineCard({ name }: Props) {
  return (
    <div className="bg-gray-200 w-[151px] h-[150px] rounded-[12px] p-4 flex flex-col justify-between">

      <div className="flex justify-between text-pink">
        <Pencil size={20} />
        <Trash2 size={20} />
      </div>

      <div className="text-center">

        <h3 className="text-[#0F1F44] font-semibold leading-tight">
          {name}
        </h3>

        <p className="text-sm text-[#0F1F44] mt-1">
          Ver desempenho
        </p>

      </div>

    </div>
  )
}