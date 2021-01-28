import React from 'react'

import ArrowIcon from '../../icons/ArrowIcon'
import Checkbox from '../Checkbox'

import { useTreeContext } from '../../context/tree'
import './styles.css'

export default function TreeItem({ node, parent }) {
    const { selectedNodes, changeNode } = useTreeContext()
    const [childrensOpen, setChildrensOpen] = React.useState(false)
    const [checkboxStatus, setCheckboxStatus] = React.useState('unselected')
    const [currentNode] = Object.values(node)
    const childrenIsEmpty = Object.keys(currentNode.children).length === 0
    const [ hoverClass, setHoverClass ] = React.useState()

    const toggleChildrensOpen = React.useCallback(() => {
        setChildrensOpen(() => !childrensOpen)
    }, [childrensOpen])

    const changeCurrentCheckboxStatus = () => {
        if(checkboxStatus === 'unselected' || checkboxStatus === 'halfselected'){
            setCheckboxStatus('selected')
            changeNode(currentNode, parent, 'selected')
        }else{
            setCheckboxStatus('unselected')
            changeNode(currentNode, parent, 'unselected')
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
            <div className={`expandable ${hoverClass}`} 
                onMouseOverCapture={() => setHoverClass('hovered')}
                onMouseOutCapture={() => setHoverClass('')}
            >
                <div className="left-side" onClick={() => changeCurrentCheckboxStatus()}>
                    <div className="checkbox-area" style={{paddingLeft: `${currentNode.level * 35}px`}}>
                        <Checkbox status={checkboxStatus}/>
                    </div>
                    <span>{currentNode.name}</span>
                </div>
                {!childrenIsEmpty && 
                    <div className="right-side" >
                        <div onClick={() => toggleChildrensOpen()}>
                            <ArrowIcon />
                        </div>
                    </div>
                }
            </div>
            {childrensOpen && !childrenIsEmpty && (
                <div className="childrens">
                    { Object.entries(currentNode.children).map(([key, value]) => (
                        <TreeItem key={key} node={{[key]: value}} parent={currentNode} />
                    ))}
                </div>
            )}
        </div>
    )
}

