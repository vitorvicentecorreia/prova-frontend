import React from 'react'

import ArrowIcon from '../../icons/ArrowIcon'
import Checkbox from '../Checkbox'

import { useTreeContext } from '../../context/tree'

export default function TreeItem({ node, parentId }) {
    const { selectNode, deselectNode, selectedNodes } = useTreeContext()
    const [childrensOpen, setChildrensOpen] = React.useState(false)
    const [checkboxStatus, setCheckboxStatus] = React.useState('unselected')
    const [currentNode] = Object.values(node)
    const childrenIsEmpty = Object.keys(currentNode.children).length === 0

    const toggleChildrensOpen = React.useCallback(() => {
        setChildrensOpen(() => !childrensOpen)
    }, [childrensOpen])

    const changeCurrentCheckboxStatus = () => {
        if(checkboxStatus === 'unselected'){
            setCheckboxStatus('selected')
            selectNode(currentNode, parentId)
        }else{
            setCheckboxStatus('unselected')
            deselectNode(currentNode, parentId)
        }
    }

    React.useEffect(() => {
        if(selectedNodes && selectedNodes[currentNode.id]){
            setCheckboxStatus(selectedNodes[currentNode.id].status)
        }else{
            setCheckboxStatus('unselected')
        }
    }, [selectedNodes])

    return (
        <div className="tree-item">
            <div className="expandable">
                <div className="left-side" onClick={() => changeCurrentCheckboxStatus()}>
                    <div className="checkbox-area">
                        <Checkbox status={checkboxStatus}/>
                    </div>
                    <span>{currentNode.name}</span>
                </div>
                {!childrenIsEmpty && 
                    <div className="right-side" onClick={() => toggleChildrensOpen()}>
                        <ArrowIcon />
                    </div>
                }
            </div>
            {childrensOpen && !childrenIsEmpty && (
                <div className="childrens">
                    { Object.entries(currentNode.children).map(([key, value]) => (
                        <TreeItem key={key} node={{[key]: value}} parentId={currentNode.id} />
                    ))}
                </div>
            )}
        </div>
    )
}

