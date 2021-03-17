# 字节大作业说明文档

#### 1、项目环境

* node环境
* npm

#### 2、运行指令

1. 安装所需依赖

   ```javascript
   npm install
   ```

2. 本地启动开发环境

   ```javascript
   npm run dev
   
   ```

#### 3、设计说明

​	采用react+electron完成本次作业，我只写了一些业务逻辑部分，markdown语法转换部分在githup上找的[react-simplemde-editor](https://github.com/RIP21/react-simplemde-editor "github地址")

集成到项目中，我只做了一些基本的配置。



#### 4、项目的不足

* 未接入node，数据不能持久化。

* 协同编辑。

  

#### 5、问题

* 项目无法引入node的模块，使用require(‘fs')导入为空对象,请问如何解决？
* react的代码all in js,有时候写着觉得很乱，如何写出漂亮的react代码，提高代码美学？