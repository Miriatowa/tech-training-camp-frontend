//  @name: 文件处理工具
//  @author: Miraitowa
//  @version: 1.0  
const fs =   require ('fs')
const path = require('path')
const fileUtils = {
    readFile: (path) => {
        return fs.readFile(path,{encoding: 'utf-8'})
    },
    writeFile: (path, content) => {
        return fs.writeFile(path, content, {encoding: 'utf-8'})
    },
    renameFile: (path, newPath) =>{
        return fs.rename(path, newPath)
    },
    deleteFile: (path) => {
        return fs.unlink(path)
    }
}

export default fileUtils