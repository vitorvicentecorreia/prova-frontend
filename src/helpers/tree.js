export const nodeHasChildren = node => node.children && Object.keys(node.children).length !== 0

export const allChildrensAreSelected = (childrens, selectedNodes) => {
    return Object.values(childrens).every(children => {
        return selectedNodes[children.id]?.status === 'selected'
    })
}

export const someChildrensAreSelected = (childrens, selectedNodes) => {
    return Object.values(childrens).some(children => {
        return selectedNodes[children.id]?.status === 'selected'
    })
}