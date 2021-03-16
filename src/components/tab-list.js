// @name: 右侧头部选项栏
// @author: Miraitowa
// @version: 1.0 

import React from 'react'
import PropTypes from 'prop-types'
import classnames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './tab-list.scss'

const Tablist = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
    return (
        <ul className='nav nav-pills tablist-component'>
            {files.map(item => {
                const withUnsavedMark = unsaveIds.includes(item.id)
                const activeclassnames = classnames({
                    "nav-link": true,
                    "withUnsaved": withUnsavedMark,
                    'active': item.id === activeId
                })
                return (
                    <li  key={item.id}>
                        <a href='#' className={activeclassnames} onClick={(e) => { e.preventDefault(); onTabClick(item.id)}}>
                            {item.title}
                            <span>
                                <FontAwesomeIcon className='ml-2 close-icon' icon={faTimes} onClick={(e) => {e.stopPropagation(); onCloseTab(item.id)} }></FontAwesomeIcon>
                            </span>
                            {withUnsavedMark && <span className='rounded-circle unsaved-icon ml-2'></span>}
                        </a>

                    </li>
                )
            })}
        </ul>
    )
}
Tablist.propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
    unsaveIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onCloseTab: PropTypes.func
}
Tablist.defaultProps = {
    unsaveIds: []
}

export default Tablist
