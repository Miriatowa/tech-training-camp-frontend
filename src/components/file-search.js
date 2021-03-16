// @name: 左侧头部
// @author: Miraitowa
// @version: 1.0  

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from "../hooks/useKeyPress";

const FileSearch = ({ title, onFileSearch }) => {
    const [inputActive, setInputActive] = useState(false)
    const [value, setValue] = useState('')
    const node = useRef(null)
    const enterPress = useKeyPress(13)
    const escPress = useKeyPress(27)
    const closeSearch = () => {
        setInputActive(false)
        setValue('')
        onFileSearch(' ')
    }
    useEffect(() => {
        if (enterPress && inputActive) onFileSearch(value)
        if (escPress && inputActive) closeSearch()
    })
    useEffect(() => {
        if (inputActive) node.current.focus()
    }, [inputActive])
    return (
        <div className='alert alert-primary mb-0'>
            {
                !inputActive &&
                <div className='d-flex justify-content-between align-items-center mb-0'>
                    <span>{title}</span>
                    <button type='button' className='icon-button btn' onClick={() => { setInputActive(true) }}>
                        <FontAwesomeIcon title='搜索' icon={faSearch}></FontAwesomeIcon>
                    </button>
                </div>
            }
            {
                inputActive &&
                <div className='d-flex justify-content-between align-items-center'>
                    <input className='form-control' value={value} ref={node} onChange={(e) => { setValue(e.target.value) }}></input>
                    <button type='button' className='icon-button btn' onClick={closeSearch}>
                        <FontAwesomeIcon title='关闭' icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
            }
        </div>


    )
}
FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired
}
export default FileSearch