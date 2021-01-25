import React from 'react'

import MinusIcon from '../../icons/MinusIcon.js'
import RightIcon from '../../icons/RightIcon.js'

import './styles.css'

export default function Checkbox({ status = 'unselected' }) {
    const currentStatus = React.useMemo(() => `checkbox-${status}`, [status])
    const currentIcon = React.useCallback(() => status === 'selected' ? <RightIcon data-testid={`icon-${status}`} /> : <MinusIcon />, [status])

    return (
        <div role="checkbox" className={`checkbox ${currentStatus}`} aria-checked>
            { currentStatus !== 'unselected' && currentIcon()}
        </div>
    )
}