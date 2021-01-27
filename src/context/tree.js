import React from 'react'

import { findNodeById, nodeHasChildren, allChildrensAreSelected, findParentChildrensByLevel, someChildrensAreSelected } from '../helpers/tree'
import { treeWithChildren } from '../mocks/tree'

import _ from 'lodash'

const TreeContext = React.createContext()

export const TreeContextProvider = ({ children }) => {  
    const [ selectedNodes, setSelectedNodes ] = React.useState({})

    const selectNode = (node, parentId) => {
        const currentNode = { [node.id]: {...node, status: 'selected'} }
        let nodesToAdd = { ...currentNode }

        const hasParent = node.level > 0
        const hasChildren = nodeHasChildren(node)
        if(hasParent){
            const recalculatedNodes = recalculateParent(node.level, parentId, {...selectedNodes, ...currentNode})
            nodesToAdd = { 
                ...nodesToAdd,
                ...recalculatedNodes
            }            
        }
        if(hasChildren){
            const childrensSelecteds = selectAllChildrensOf(node.level, node.id)
            nodesToAdd = { 
                ...nodesToAdd,
                ...childrensSelecteds
            } 
        } 
        
        setSelectedNodes({...selectedNodes, ...nodesToAdd})
    }

    const deselectNode = (node, parentId) => {
        let filteredNodes = { ...selectedNodes } 
        delete filteredNodes[node.id]

        const hasParent = node.level > 0
        const hasChildren = nodeHasChildren(node)
        if(hasParent){
            const recalculatedNodes = recalculateParent(node.level, parentId, filteredNodes)   
            filteredNodes = {
                ...filteredNodes,
                ...recalculatedNodes
            }         
        }
        if(hasChildren){
            const childrensSelecteds = unselectAllChildrensOf(node.level, node.id)
            childrensSelecteds.forEach(id => {
                delete filteredNodes[id]
            })
        } 
        
        setSelectedNodes({...filteredNodes})
    }

    const recalculateParent = (level, parentId, currentNodes) => {
        const parentNode = findNodeById(parentId, treeWithChildren[0])
        const parentChildrens = findParentChildrensByLevel(level - 1, parentId, treeWithChildren[0])
        const nodeStatus = allChildrensAreSelected(parentChildrens, currentNodes) 
            ? 'selected' 
            : someChildrensAreSelected(parentChildrens, currentNodes)
                ? 'halfselected'
                : 'unselected'

        return {
            [parentId] : {
                ...parentNode,
                status: nodeStatus
            }
        }
    }

    const selectAllChildrensOf = (level, nodeId) => {
        const parentChildrens = findParentChildrensByLevel(level, nodeId, treeWithChildren[0])
        let childrensSelecteds = {}
        
        for(const key in parentChildrens){
            childrensSelecteds = { 
                ...childrensSelecteds,
                [parentChildrens[key].id]: {
                    ...parentChildrens[key],
                    status: 'selected'
                }
            }
        }

        return childrensSelecteds
    }

    const unselectAllChildrensOf = (level, nodeId) => {
        const parentChildrens = findParentChildrensByLevel(level, nodeId, treeWithChildren[0])
        const childrensUnselecteds = []

        for(const key in parentChildrens){
            childrensUnselecteds.push(parentChildrens[key].id)
        }

        return childrensUnselecteds
    }

    return (
        <TreeContext.Provider value={{ selectNode, deselectNode, selectedNodes }}>
            { children }
        </TreeContext.Provider>
    )
}

export const useTreeContext = () => {
    const context = React.useContext(TreeContext)
    const { selectNode, deselectNode, selectedNodes } = context
    
    return { selectNode, deselectNode, selectedNodes }
}