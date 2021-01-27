import { render, screen } from '@testing-library/react'
import Checkbox from '.'

/*
    O componente terá 3 status: unselected, selected, halfselected

    - unselected define q ele não está selecionado
    - selected define q ele está selecionado
    - halfselected define q ele está meio selecionado

    As props serão: 
    - status - String (unselected ou selected ou halfselected)
*/

describe('Checkbox', () => {
    test(`Dado que o componente foi renderizado
    e ele recebeu o status unselected via prop ou nenhuma prop,
    deve apresentar o componente sem icone`, () => {
        render(<Checkbox />)

        const checkbox = screen.getByRole('checkbox')
        
        expect(checkbox).toBeVisible()
        expect(screen.queryByTitle(/ícone de certo/i)).not.toBeInTheDocument()
        expect(screen.queryByTitle(/ícone de menos/i)).not.toBeInTheDocument()
    })

    test(`Dado que o componente foi renderizado
    e ele recebeu o status selected via prop,
    deve apresentar o componente apenas com o ícone de certo`, () => {
        render(<Checkbox status='selected' />)

        const checkbox = screen.getByRole('checkbox')
        const checkIcon = screen.getByTitle(/ícone de certo/i)
        const minusIcon = screen.queryByTitle(/ícone de menos/i)
        
        expect(checkbox).toBeVisible()
        expect(checkIcon).toBeInTheDocument()
        expect(minusIcon).not.toBeInTheDocument()
    })

    test(`Dado que o componente foi renderizado
    e ele recebeu o status halfselected via prop,
    deve apresentar o componente apenas com o ícone de menos`, async () => {
        render(<Checkbox status='halfselected' />)

        const checkbox = screen.getByRole('checkbox')
        const minusIcon = await screen.findByTitle(/ícone de menos/i)
        const checkIcon = screen.queryByTitle(/ícone de certo/i)

        expect(checkbox).toBeVisible()
        expect(minusIcon).toBeInTheDocument()
        expect(checkIcon).not.toBeInTheDocument()
    })
})