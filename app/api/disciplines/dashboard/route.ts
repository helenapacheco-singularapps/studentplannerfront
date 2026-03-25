
const BACKEND_URL = "http://localhost:8080/dashboard";

export async function GET() {
    try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) {
            const text = await res.text();
            return new Response(`Erro ao buscar disciplinas: ${text}`, { status: res.status });
        }
        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        return new Response(`Erro interno no servidor: ${err}`, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.name) return new Response("Campo 'name' obrigatório", { status: 400 });

        const res = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const text = await res.text();
            return new Response(`Erro ao criar disciplina: ${text}`, { status: res.status });
        }

        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        return new Response(`Erro interno no servidor: ${err}`, { status: 500 });
    }
}