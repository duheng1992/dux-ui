import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'DUX-UI',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/dux-ui/',
  publicPath: '/dux-ui/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  // more config: https://d.umijs.org/config
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: false,
      // 需要忽略的属性名列表，默认为空数组
      skipPropsWithName: ['ref'],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc: true,
    },
  },
  alias: {
    src: '/src',
  },
  styles: [
    `body { @import url('static/style/icon.css'); margin: 0; padding: 0; }`,
    `.demo-wrap {
      padding: 10px;
      border: 1px dashed #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      margin-top: 10px;
      border-style: solid;
      font-size: 12px;
    }`,
    `.demo-block {
      margin-right: 10px;
      display: inline-block;
    }
    .demo-block-lg {
      margin-right: 30px;
      display: inline-block;
    }
    .demo-block-row {
      display: block;
      margin-right: 0;
    }
    .demo-block-row + .demo-block-row {
      margin-top: 10px;
    }
    .demo-block-row + .demo-block-row.demo-block-lg {
      margin-top: 30px;
    }
    `,
  ],
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/components': [
      {
        title: '基础组件',
        path: '/components/baseEle',
        children: [
          // 菜单子项（可选）
          'components/Icon/index.md',
          'components/Button/index.md',
          'components/Box/index.md',
          'components/Combine/index.md',
          'components/Grid/index.md',
          'components/Collapse/index.md',
        ],
      },
      {
        title: '表单组件',
        path: '/components/formEle',
        children: [
          // 菜单子项（可选）
          'components/Form/index.md',
          'components/Input/index.md',
          'components/NumberInput/index.md',
          'components/Radio/index.md',
          'components/Textarea/index.md',
          'components/Switch/index.md',
          'components/Select/index.md',
          'components/Checkbox/index.md',
          'components/TimePicker/index.md',
          'components/Calendar/index.md',
          'components/DatePicker/index.md',
          'components/Upload/index.md',
        ],
      },
      {
        title: '弹出层组件',
        path: '/components/overlayEle',
        children: [
          // 菜单子项（可选）
          'components/Popover/index.md',
          'components/Menu/index.md',
          'components/Modal/index.md',
          'components/Tooltip/index.md',
        ],
      },
      {
        title: '数据展示组件',
        path: '/components/dataEle',
        children: [
          // 菜单子项（可选）
          // 'components/Pagination/index.md',
          'components/Notice/index.md',
          'components/Table/index.md',
        ],
      },
    ],
  },
});
