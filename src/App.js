import React,{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'easymde/dist/easymde.min.css'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons'  
import FileSearch from "./components/file-search";
import FileList from "./components/file-list";
import FileButton from "./components/file-button";
import Tablist from "./components/tab-list";
import SimpleMDE from 'react-simplemde-editor'
// import fileUtils from './utils/file-utils'

const { join, basename, extname, dirname } = require('path')
const fs = require('fs')

function App() {
  console.log('引入模块：',fs , join )
  const [files, setFiles] = useState([{id: "1",title: 'vue', content: '## vue笔记文档'}, {id: "2", title: 'react', content: '## react笔记文档'}])
  const [activeFileId, setActiveFileId] = useState('')
  const [openedFileIds, setOpenedFileIds] = useState([])
  const [unsavedFileIds, setUnsavedFileIds] = useState([])
  const [searchFiles, setSearchFiles] = useState([])
  // 保存路径
  // const savePath = remote.app.getPath('desktop')
 // 打开文件
  const openedFiles = openedFileIds.map(openId => {
  return files.find(item => item.id === openId)
})
  // 打开资源管理器的文件
  const fileClick = (fileId) =>{
    // 1、设置激活状态
     setActiveFileId(fileId)
    // 2、把当前文件加入到打开文件中
    console.log('打开id：',fileId,openedFileIds)
    if(!openedFileIds.includes(fileId)){
      setOpenedFileIds([...openedFileIds,fileId])
    }
  }
  const tabClick = (fileId) =>{
    setActiveFileId(fileId)
  }
  const tabClose = (cid) =>{
    const tabWithout = openedFileIds.filter(fileId => fileId !== cid)
    setOpenedFileIds(tabWithout)
    if(tabWithout.length > 0){
      setActiveFileId(tabWithout[0])
    }else{
      setActiveFileId('')
    }
  }
   
  // 所选当前文件
  const activeFile = files.find(item => item.id === activeFileId)
  // 更新当前文件内容
 const fileChange = (id,value) =>{ 
  const newFiles = files.map(file => {
    if(file.id === id){
      file.content = value
    }
    return file
  })
  setFiles(newFiles)
  if(!unsavedFileIds.includes(id)){
    setUnsavedFileIds([...unsavedFileIds, id])
  }
}
// 删除文件
const fileDelete = (id) => {
  const newFiles = files.filter(item => item.id !== id)
  setFiles(newFiles)
  tabClose(id)
}
// 更新文件名
const updateFileName = (id, newVal, isNew) =>{
  const newFiles = files.map((item) => {
    if(item.id === id){
      item.title = newVal
      item.isNew = false
    }
    return item
  })
  // if(isNew){
  //   fileUtils.writeFile(join(savePath, `${newVal}.md`), files[id].content).then(()=>{
  //     setFiles(newFiles)
  //   })
  // }else{
  //   fileUtils.renameFile(join(savePath, `${files[id].title}.md`), join(savePath, `${newVal}.md`)).then(() => {
  //     setFiles(newFiles)
  //   })
  // }
  setFiles(newFiles)
}
// 搜索文件
const fileSearch = (keyword) => {
  const newFiles = files.filter(item => item.title.includes(keyword))
  setSearchFiles(newFiles)
}
// 新建文件
const createNewFile = () =>{
  const newId = uuidv4()
  const newFiles = [...files, {id: newId,title: '', content:'## 欢迎使用Markdown', isNew: true}]
  setFiles(newFiles)
}
  return (
    <div className="App container-fluid px-0">
      <div className='row no-gutters'>
        <div className='col-3  left-panel'>
          <FileSearch title='资源管理器' onFileSearch={fileSearch}></FileSearch>
          <FileList files={searchFiles.length > 0 ? searchFiles : files}  onFileClick={fileClick} onFileDelete={fileDelete} onSaveEdit={updateFileName}></FileList>
          <div className="row no-gutters button-group">
            <div className='col .no-border'>
              <FileButton text='新建' color='btn-primary' icon={faPlus} onClickBtn={createNewFile}></FileButton>
            </div>
            <div className='col .no-border'>
              <FileButton text='导入' color='btn-success' icon={faFileImport} ></FileButton>
            </div>
          </div>
        </div>
        <div className='col-9  right-panel'>
          <Tablist files={openedFiles} activeId={activeFileId} unsaveIds={unsavedFileIds} onTabClick={tabClick} onCloseTab={tabClose}></Tablist>
          <SimpleMDE key={activeFile && activeFile.id} value={activeFile && activeFile.content} onChange={(value) => {fileChange(activeFile.id,value)}} options={{minHeight: '515px'}}></SimpleMDE>
        </div>
      </div>
    </div>
  );
}

export default App;
