import { Pencil, Trash2 } from "lucide-react"

type Props = {
  name: string
}

export default function DisciplineCard({ name }: Props) {
  return (
    <div className="bg-gray-200 w-[130px] h-[130px] rounded-[12px] p-4 flex flex-col justify-between">

      <div className="flex justify-between text-pink">
        <Pencil size={15} />
        <Trash2 size={15} />
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