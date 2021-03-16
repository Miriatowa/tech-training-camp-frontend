//  @name: 左侧按钮
//  @author: Miraitowa
//  @version: 1.0  

import React from "react";
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FileButton = ({ text, color, icon, onClickBtn }) => {
    return (
        <button type='button' className={`btn btn-block no-border ${color}`} onClick={()=>{ onClickBtn()}}>
            <FontAwesomeIcon icon={icon} className='mr-2' ></FontAwesomeIcon>
            {text}
        </button>
    )
}
FileButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.object,
    onClickBtn: PropTypes.func
}

export default FileButton