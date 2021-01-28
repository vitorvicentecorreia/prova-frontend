import { screen, render, fireEvent } from '@testing-library/react'

import TreeItem from '.'
import { treeWithChildren, treeWithoutChildren, treeWithoutSomeChildrens } from '../../mocks/tree'

import { TreeContextProvider } from '../../context/tree'

const renderWithContext = (ui) => {
    return render(<TreeContextProvider>{ui}</TreeContextProvider>)
}

describe("TreeItem", () => {
    /*
        - O componente terá um Checkbox, um name e uma arrow
        - Caso ele não tenha filhos, a arrow não é renderizada
        - Caso clique no checkbox, todos os filhos serão selecionados
        - Caso alguns e não todos os filhos estejam selecionado, o nó atual
        ficará com icone de menos
    */

    test(`Dado que o componente foi renderizado
    e recebeu a prop node com nós filhos,
    deve renderizar o checkbox, o name e o ícone de seta`, () => {
        renderWithContext(<TreeItem node={treeWithChildren} />)

        expect(screen.getByRole('checkbox')).toBeVisible()
        expect(screen.getByText('Richard Paul M.')).toBeVisible()
        expect(screen.getByTitle(/Ícone de seta/i)).toBeInTheDocument()
    })

    test(`Dado que o componente foi renderizado
    e recebeu a prop node com nós filhos,
    ao clicar na seta do nó atual, os nós filhos devem ser apresentados`, async () => {
        const textsOnScreen = [
            'Richard Paul M.',
            'Luis F. Doris',
            'Maurice Rudolf Ludwig',
            'Joseph E. James A.',
            'Alan G. William'
        ]

        renderWithContext(<TreeItem node={treeWithChildren} />)
        
        expect(screen.getByText(textsOnScreen[0])).toBeVisible()
        textsOnScreen.shift()
        
        for (const [index, text] of textsOnScreen.entries()) {
            const currentArrow = screen.getAllByTitle(/Ícone de seta/i)[index]
            if(currentArrow) fireEvent.click(currentArrow.closest('svg'))
            expect(await screen.findByText(text)).toBeVisible()
        }
    })

    test(`Dado que o componente foi renderizado
    e recebeu a prop node sem nós filhos,
    o icone de seta não deverá ser renderizado.`, async () => {
        renderWithContext(<TreeItem node={treeWithoutChildren} />)

        expect(screen.getByText('Alan G. William')).toBeVisible()
        expect(screen.queryByTitle(/Ícone de seta/i)).not.toBeInTheDocument()
    })

    test(`Dado que o componente foi renderizado
    e recebeu a prop node com alguns filhos,
    ao clicar no titulo do nó atual, ele deve ficar com o checkbox com icone de certo,
    e ao expandir esse nó, os filhos devem estar também com o checkbox com ícone de certo`, () => {
        renderWithContext(<TreeItem node={treeWithoutSomeChildrens} />)

        fireEvent.click(screen.getByText('Alan G. William'))
        expect(screen.getByTitle(/Ícone de certo/i)).toBeInTheDocument()

        fireEvent.click(screen.getAllByTitle(/Ícone de seta/i)[0])
        expect(screen.getAllByTitle(/Ícone de certo/i).length).toBe(5)
    })

    test(`Dado que o componente foi renderizado
    e receebeu a prop node com alguns filhos,
    ao expandir o nó atual e selecionar alguns, não todos, filhos,
    o nó pai deve ficar com o checkbox com ícone de menos.`, async () => {
        renderWithContext(<TreeItem node={treeWithoutSomeChildrens} />)

        fireEvent.click(screen.getAllByTitle(/Ícone de seta/i)[0])
        fireEvent.click(await screen.findByText('Vitor Vicente'))
        fireEvent.click(await screen.findByText('Caroline Rodrigues'))

        expect(screen.getAllByTitle(/Ícone de menos/i).length).toBe(1)
        expect(screen.getAllByTitle(/Ícone de certo/i).length).toBe(2)
    })
})
