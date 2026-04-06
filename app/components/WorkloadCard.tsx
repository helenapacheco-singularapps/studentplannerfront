type Props = {
  percentage?: number
}

export default function WorkloadCard({ percentage = 42 }: Props) {
  return (
    <div className="border-2 w-80 h-60 border-pink rounded-xl p-10 max-w-sm">
      <h2 className="text-xl mb-8 font-semibold text-pink">
        Carga horária cursada do currículo
      </h2>

      <div className="flex justify-center items-center">
        <div className="relative w-40 h-20 overflow-hidden">
        
          <div className="absolute w-40 h-40 rounded-full border-16 border-pinkly top-0 left-0"></div>


          <div
            className="absolute w-40 h-40 rounded-full border-16 border-pink top-0 left-0"
            style={{
              clipPath: "inset(0 0 50% 0)",
              transform: `rotate(${(percentage / 100) * 180}deg)`,
              transformOrigin: "center",
            }}
          ></div>

        
          <div className="absolute inset-0 flex items-center justify-center mt-6">
            <span className="text-pink font-bold text-lg">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}