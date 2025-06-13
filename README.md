# dux-ui

基于 React 的前端 UI 库。 It is just for learning.

## 开发规划

1. 完善常用组件
2. 上线 Github 和 npm
3. 二次封装业务组件

## 开发记录

1. 搭建 Dumi 环境
2. 设置主题配置
3. 添加 Button 和 Icon 组件
4. 配置 git-cz
5. 开发中...

## 仓库地址

[Dux-ui](https://gitee.com/dh1992/dux-ui-react)

## 兼容环境

React 14+, 暂不支持 React18

## 开发者

### 启动 doc 服务

`npm run docs`

### 部署 doc page

`npm run docs:build`

`npm run docs:deploy`

### 发布 npm

`npm run build:babel`

`npm run build:dist`

`npm login`

`npm run release:patch`

`npm publish`

## start

执行：`npm install --save dux-ui`

create-react-app 项目里使用：

```jsx
import { Button, Icon } from 'dux-ui';

// 使用Icon需要额外引入css
import 'dux-ui/dist/styles/icon.min.css';

function App() {
  const { StyleTypes } = Button;

  return (
    <div className="App">
      <Icon type="loading" />

      {StyleTypes.map((styleType) => (
        <Button
          styleType={styleType}
          key={'key' + styleType}
          onClick={() => console.log('clicked')}
        >
          {styleType}
        </Button>
      ))}
    </div>
  );
}
```

vite react 项目里试试同上，需要在 vite.config.js 添加配置：

```js
alias: [
  { find: 'dux-ui', replacement: '/node_modules/dux-ui/lib/index.js' },
],
```
