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

* 数据持久化。可以接入node完成数据持久化

* 协同编辑。

  

#### 5、总结

##### 遇到的问题：

*  react运行在浏览器，而我要接入node模块，引用node模块为空对象，如：require（‘fs）时打印为空对象

* react的中的抽象组件的封装

  

##### 收获：

* 项目采用的react,封装了一些函数组件，加深了对react-hooks和函数组件的理解
* 项目中遇到了问题会在一些论坛或者咨询前辈找解决方案，提高独自思考和解决问题的能力
* 熟悉了electron框架的使用和开发