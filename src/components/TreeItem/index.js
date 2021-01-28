import React from 'react'

import ArrowIcon from '../../icons/ArrowIcon'
import Checkbox from '../Checkbox'

import { useTreeContext } from '../../context/tree'
import './styles.css'

export default function TreeItem({ node, parent }) {
    const { selectedNodes, changeNode } = useTreeContext()
    const [childrensOpen, setChildrensOpen] = React.useState(false)
    const [checkboxStatus, setCheckboxStatus] = React.useState('unselected')
    const childrenIsEmpty = node.children && Object.keys(node.children).length === 0

    const toggleChildrensOpen = React.useCallback(() => {
        let childrensOpenIds = JSON.parse(localStorage.getItem('childrensOpenIds')) || []
        if(childrensOpen){
            childrensOpenIds = childrensOpenIds.filter(id => id !== node.id)
            localStorage.setItem('childrensOpenIds', JSON.stringify(childrensOpenIds))
        }else{
            childrensOpenIds.push(node.id)
            localStorage.setItem('childrensOpenIds', JSON.stringify(childrensOpenIds))
        }
        setChildrensOpen(() => !childrensOpen)
    }, [childrensOpen])

    const changeCurrentCheckboxStatus = () => {
        if(checkboxStatus === 'unselected' || checkboxStatus === 'halfselected'){
            setCheckboxStatus('selected')
            changeNode(node, parent, 'selected')
        }else{
            setCheckboxStatus('unselected')
            changeNode(node, parent, 'unselected')
        }
    }

    React.useEffect(() => {
        if(selectedNodes && selectedNodes[node.id]){
            setCheckboxStatus(selectedNodes[node.id].status)
        }else{
            setCheckboxStatus('unselected')
        }
    }, [selectedNodes])

    React.useEffect(() => {
        const childrensOpenIds = JSON.parse(localStorage.getItem('childrensOpenIds')) || []
        const open = childrensOpenIds.find(id => id === node.id)
        open && setChildrensOpen(() => open)
    }, [])

    return (
        <div className="tree-item">
            <div className="expandable">
                <div className="left-side" onClick={() => changeCurrentCheckboxStatus()}>
                    <div className="checkbox-area" style={{paddingLeft: `${node.level * 25}px`}}>
                        <Checkbox status={checkboxStatus}/>
                    </div>
                    <span>{node.name}</span>
                </div>
                {!childrenIsEmpty && 
                    <div className="right-side" >
                        <div onClick={() => toggleChildrensOpen()}>
                            <ArrowIcon open={childrensOpen} />
                        </div>
                    </div>
                }
            </div>
            {childrensOpen && !childrenIsEmpty && (
                <div className="childrens">
                    { Object.values(node.children).map((value, index) => (
                        <TreeItem key={index} node={value} parent={node} />
                    ))}
                </div>
            )}
        </div>
    )
}

