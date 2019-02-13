# 基于webpack4的组件化开发框架
### 概述
习惯了vue框架，在开发公司官网时，发现VUE开发完成后，没有html页面结构，超级不利于SEO搜索引擎优化；

vue的nuxt.js框架稍微比较小众，遇到问题解决不便；

喜欢组件化开发，习惯了scss的遍历，es6的强大功能，同时也想学习一下webpack，于是封装了此框架；

主要功能特点如下：

- 基于webpack4
- 分组件分模块开发，支持ejs语法，编译后组装为完整页面，具有html结构
- 样式文件支持 scss 语法，且自动添加浏览器兼容前缀
- js 文件支持 es6 语法，支持模块化引入
- 默认已引入了 jquery

---

### 使用步骤：
前提全局安装了node.js
使用终端进入项目主目录，执行：  
```npm install```  
执行完毕后，输入一下命令启动服务，开始开发：  
```npm run dev```  
执行以下命令，打包到```dist```文件夹：  
```npm run dev```  

---

### 框架简略说明：
```static```文件夹为静态不编译，打包后自动把里面的所有文件，复制到```dist```文件夹中，可以放置一些不需要编译、或者特殊的文件。


```src```为主要开发目录


```assets```应放入图片、scss文件、js文件、插件、iconfont等，可在此文件夹中，自行创建目录分类放置

```components```为组件放置位置，里面的每一个文件夹，都是一个组件文件夹，是一块相对功能比较独立的、或者需要复用的页面结构，比如头部、底部、一个弹窗组件等等，需要自己开发，其中的文件，依托于页面文件夹的引入，没有引入，就不会编译执行。

```pages```为页面放置位置，里面的每一个文件夹，都是一个页面文件夹，比如index主页，about相关页等，每个页面都可以引入多个组件，如果使用了组件，则必须需要再ejs文件中，引入对应组件的ejs文件（引入方式下面会说明，也可以直接看demo代码），同时也需要在js文件中，引入对应组件的js文件。

```index.html```所有页面统一使用的html模板，比如在这里写好了head中的meat便签等，则开发完成后，所有页面都会有。

```main.js```每个页面都会自动引入的一个js文件，可以用来引入一些所有页面都需要引入的功能，比如页面宽度发生变化，自动刷新页面等。

---

### 下面说一下组件的开发规则
组件分```components```和```pages```两种，二者区别不大，下面依次说明。

#### ```components```中：
```.scss```样式文件，完全兼容css，当然也可以使用```css```格式命名；  
如果有全局基础样式文件，如果文件格式为css，则可以在上面说的```main.js```文件中引入；  
如果为scss文件格式，且里面定义了一些scss变量或方法等，则必须在这里每个```.scss```中引入，比较麻烦。

```index.js```这个组件的js文件，需要在这里引入本组件的```scss```文件，如果有为本组件单独准备的js文件，也在这里引入，如果有css文件，也可以在这里引入，只不过就显得有些不规范而已。

```index.ejs```这是html结构组件，格式为ejs，完全兼容html，支持ejs语法（有需要可以学习一下），注意，在这里引入图片或者其他文件，需要用ejs的语法，比如：```<%= require('@/assets/imgs/my_logo_white.png') %>```，注意里面的'```@```'，用来指代```src```文件夹，由此可用比较‘绝对’的相对路径，借鉴了vue。

#### ```pages```中：
首先，完全适用```components```的规则，此外：

需要再ejs文件的最上面，写上```<%= require('#/getHtml.js').up({title: '这里是首页'}) %>```，其中title为此页面的title标题，如果这个页面标题固定，在这里写就行，但如果是活的，也可以在js中重新使用```document.title```重新定义。

还需要再ejs文件的最下面，写上```<%= require('#/getHtml.js').down() %>```。  
上面的两部操作，是为了把头尾新增的这两条语句，他中间的部分，作为页面主体，塞入上面说的```index.html```页面模板的body中。

作为页面，可能会引入组件，当需要引入组件时，则需要再ejs和js两个文件中做修改：
ejs文件中，在需要插入组件的地方，写上```<%= require('@/components/topBar/index.ejs')() %>```，此使用了ejs语法，这里死记硬背即可，根据路径可得，引入的是对应组件的ejs文件。  
js文件中，需要在这里，引入刚刚使用的组件的js文件，即可。

#### 其他说明
编译完成后，页面的文件名就是文件夹名

主要说明如上。