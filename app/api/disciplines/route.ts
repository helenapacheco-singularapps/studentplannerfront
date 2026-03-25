const BACKEND_URL = "http://localhost:8080/disciplines"

export async function GET() {
    const res = await fetch(BACKEND_URL)

    if (!res.ok) {
        return new Response("Erro ao buscar disciplinas", { status: 500 })
    }

    const data = await res.json()
    return Response.json(data)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        console.log("BODY ENVIADO:", body)
        const res = await fetch("http://localhost:8080/disciplines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        const text = await res.text()

        console.log("RESPOSTA BACKEND:", text)

        if (!res.ok) {
            return new Response(text, { status: res.status })
        }

        return new Response(text, { status: 200 })
    } catch (err) {
        console.error("ERRO GERAL:", err)
        return new Response("Erro interno", { status: 500 })
    }
}