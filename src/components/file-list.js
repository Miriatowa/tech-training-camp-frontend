//  @name: 左侧文件列表
//  @author: Miraitowa
//  @version: 1.0  

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from "../hooks/useKeyPress";


const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
    const [editStatus, setEditStatus] = useState(false)
    const [value, setValue] = useState('')
    const enterPress = useKeyPress(13)
    const escPress = useKeyPress(27)
    const closeSearch = (editItem) => {
        setEditStatus(false)
        setValue('')
        if(editItem.isNew){
            onFileDelete(editItem.id)
        }
    }
    useEffect(() => {
        const newFile =files.find(file => file.isNew)
        if(newFile){
            setEditStatus(newFile.id)
            setValue(newFile.title)
        }
    }, [files])
    useEffect(() => {
        const handleInputEvent = (e) => {
            const editItem = files.find(item => item.id === editStatus)
            if (enterPress && editStatus && value.trim() !== '') {
                onSaveEdit(editItem.id, value)
                setEditStatus(false)
                setValue('')
            } else if (escPress && editStatus) {
                closeSearch(editItem)
            }
        }
        document.addEventListener('keyup', handleInputEvent)
        return () => {
            document.removeEventListener('keyup', handleInputEvent)
        }
    })
    return (
        <ul className='list-group list-group-flush file-list'>
            {
                files.map(item => (
                    <li className='list-group-item bg-light d-flex align-items-center row mx-0 ' key={item.id}>
                        {
                            (item.id !== editStatus && !item.isNew) &&
                            <>
                                <span className='col-2'><FontAwesomeIcon icon={faMarkdown}></FontAwesomeIcon></span>
                                <span className='col-6' onClick={() =>{ onFileClick(item.id)} }>{item.title}</span>
                                <button type='button' className='icon-button btn col-2' onClick={() => { setEditStatus(item.id); setValue(item.title) }}>
                                    <FontAwesomeIcon title='编辑' icon={faEdit}></FontAwesomeIcon>
                                </button>
                                <button type='button' className='icon-button btn col-2' onClick={()=>{onFileDelete(item.id)}}>
                                    <FontAwesomeIcon title='删除' icon={faTrash}></FontAwesomeIcon>
                                </button>
                            </>
                        }
                        {
                            ((item.id === editStatus) || item.isNew) &&
                            <>

                                <input className='form-control col-10' placeholder='请输入文件名...' value={value} onChange={(e) => { setValue(e.target.value) }}></input>
                                <button type='button' className='icon-button btn col-2' onClick={() => {closeSearch(item)} }>
                                    <FontAwesomeIcon title='关闭' icon={faTimes}></FontAwesomeIcon>
                                </button>

                            </>
                        }

                    </li>
                ))
            }
        </ul>
    )
}
FileList.propTypes = {
    files: PropTypes.array,
    onFileClick: PropTypes.func,
    onFileDelete: PropTypes.func,
    onSaveEdit: PropTypes.func
}
export default FileList