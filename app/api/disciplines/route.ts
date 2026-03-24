export async function GET() {
    try {
        const response = await fetch("http://localhost:8080/disciplines")

        const data = await response.json()

        return Response.json(data)
    } catch (error) {
        return Response.json(
            { error: "Erro ao buscar disciplinas" },
            { status: 500 }
        )
    }
}