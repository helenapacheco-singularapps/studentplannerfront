const BACKEND_URL = "http://localhost:8080/disciplines"

export async function DELETE(
    _req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    try {
        const res = await fetch(`http://localhost:8080/disciplines/${id}`, {
            method: "DELETE",
        })

        if (!res.ok) {
            const text = await res.text()
            console.error("ERRO BACK:", text)
            return new Response(text, { status: res.status })
        }

        return new Response(null, { status: 204 })
    } catch (err) {
        console.error("ERRO DELETE:", err)
        return new Response("Erro ao deletar", { status: 500 })
    }
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const body = await req.json()

    try {
        const res = await fetch(`${BACKEND_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        if (!res.ok) {
            const text = await res.text()
            console.error("ERRO BACK:", text)
            return new Response(text, { status: res.status })
        }

        const data = await res.json()
        return Response.json(data)
    } catch (err) {
        console.error("ERRO PUT:", err)
        return new Response("Erro ao atualizar", { status: 500 })
    }
}