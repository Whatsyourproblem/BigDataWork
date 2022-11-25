# 作业

### 启动项目

需要提前安装好 `nodejs` 与 `yarn`,下载项目后在项目主目录下运行 `yarn` 拉取依赖包。安装完依赖包之后然后使用 `vue-cli` 或者直接使用命令`npm run serve`，就可以启动项目，启动项目后最好是手动全屏查看（按 F11）。如果编译项目的时候提示没有 DataV 框架的依赖，输入 `npm install @jiaminghi/data-view` 或者 `yarn add @jiaminghi/data-view` 进行手动安装。

如果安装完依赖 @jiaminghi 报错 `<template v-for> key should be placed on the <template> tag` 类似的bug，我已经做了修复，大家把此工程目录下的 `other_modules/@jiaminghi.rar` 解压并替换掉 node_modules 里面的同名文件（或者手动修改，只需要把 v-for 移动到下方标签里，并删除 template 即可），我已经给作者提了 Issues 希望大家拉取的时候没有这个错误



