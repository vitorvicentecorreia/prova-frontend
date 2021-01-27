export const nodeHasChildren = node => node.children && Object.keys(node.children).length !== 0

export const findParentChildrensByLevel = (parentLevel, parentId, currentNode) => {
    if(currentNode.level === parentLevel && currentNode.id === parentId){
        return currentNode.children
    }

    for (const key in currentNode.children) {
        findParentChildrensByLevel(parentLevel, parentId, currentNode.children[key])
    }
}

export const allChildrensAreSelected = (childrens, selectedNodes) => {
    return Object.values(childrens).every(children => {
        return selectedNodes.hasOwnProperty(children.id)
    })
}

export const someChildrensAreSelected = (childrens, selectedNodes) => {
    return Object.values(childrens).some(children => {
        return selectedNodes.hasOwnProperty(children.id)
    })
}

export const findNodeById = (nodeId, currentNode) => {
    if(currentNode.id === nodeId) return currentNode

    for(const key in currentNode.children) {
        findNodeById(nodeId, currentNode.children[key])
    }
}