export type Discipline = {
    id: string
    name: string
    status: string
    semester: string
}

export async function getDisciplines(): Promise<Discipline[]> {
    const res = await fetch("/api/disciplines")

    if (!res.ok) {
        throw new Error("Erro ao buscar disciplinas")
    }

    return res.json()
}

export async function addDiscipline(data: {
    name: string
    status: string
    semester: string
}) {
    console.log("ENVIANDO:", data)

    const res = await fetch("/api/disciplines", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const text = await res.text()
        console.error("ERRO:", text)
        throw new Error(text)
    }

    return res.json()
}

export async function deleteDiscipline(id: string) {
    console.log("DELETE ID:", id)

    const res = await fetch(`/api/disciplines/${id}`, {
        method: "DELETE",
    })

    if (!res.ok) {
        const text = await res.text()
        console.error("ERRO DELETE:", text)
        throw new Error(text)
    }

    return true
}
export async function updateDiscipline(
    id: string,
    data: {
        status: string
    }
) {
    const res = await fetch(`/api/disciplines/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        throw new Error("Erro ao atualizar disciplina")
    }

    return res.json()
}