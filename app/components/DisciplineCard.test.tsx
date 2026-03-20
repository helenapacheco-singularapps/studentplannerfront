import { render, screen, fireEvent } from "@testing-library/react"
import DisciplineCard from "./DisciplineCard"

describe("DisciplineCard", () => {
    test("renderiza nome da disciplina e texto 'Ver desempenho'", () => {
        render(
            <DisciplineCard
                name="Sistemas Operacionais"
                size="md"
                onEdit={() => { }}
                onDelete={() => { }}
            />
        )

        expect(
            screen.getByText("Sistemas Operacionais")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Ver desempenho")
        ).toBeInTheDocument()
    })

    test("chama onEdit ao clicar no primeiro ícone", () => {
        const handleEdit = jest.fn()

        const { container } = render(
            <DisciplineCard
                name="Banco de Dados"
                size="md"
                onEdit={handleEdit}
                onDelete={() => { }}
            />
        )

        const icons = container.querySelectorAll("svg")

        fireEvent.click(icons[0]) // ícone editar

        expect(handleEdit).toHaveBeenCalledTimes(1)
        expect(handleEdit).toHaveBeenCalledWith("Banco de Dados")
    })

    test("chama onDelete ao clicar no segundo ícone", () => {
        const handleDelete = jest.fn()

        const { container } = render(
            <DisciplineCard
                name="Redes"
                size="md"
                onEdit={() => { }}
                onDelete={handleDelete}
            />
        )

        const icons = container.querySelectorAll("svg")

        fireEvent.click(icons[1]) // ícone deletar

        expect(handleDelete).toHaveBeenCalledTimes(1)
        expect(handleDelete).toHaveBeenCalledWith("Redes")
    })
})