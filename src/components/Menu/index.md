---
group:
  title: 弹出层组件
  path: /components/overlayEle
  order: 2

order: 1
---

# Menu

## Show Demo

```tsx
import React from 'react';
import { Menu, Button, Radio, Switch, Form } from 'dux-ui';

const { Elements: FormElements } = Form;

const generateNumber = (min, max) => {
  const random = Math.random();
  return (min + random * (max + 1 - min)) | 0;
};
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiple: false,
      selectable: true,
      menuData: this.generateMenuData(),
    };
  }
  generateMenuData() {
    const generateMenuItem = (count, prefix) => {
      return new Array(count).fill(null).map((v, i) => {
        const key = `${prefix}-${i}-item`;
        return {
          itemKey: key,
          label: key,
          type: 'item',
        };
      });
    };

    const generateMenuGroup = (depth, prefix) => {
      const itemCount = generateNumber(1, 5);
      const menuItems = generateMenuItem(itemCount, prefix);

      let subMenuItems = [];

      if (depth) {
        const subMenuCount = generateNumber(1, 3);

        subMenuItems.length = subMenuCount;
        subMenuItems = subMenuItems.fill(null).map((v, i) => {
          const key = `${prefix}-${i}-subMenu`;
          return {
            subMenuKey: key,
            title: key,
            type: 'subMenu',
            styleType: ['collapse', 'popover'][Math.random().toFixed()],
            children: generateMenuGroup(depth - 1, key),
          };
        });
      }
      return menuItems.concat(subMenuItems);
    };

    return generateMenuGroup(generateNumber(3, 7), 'root');
  }
  renderMenu(menuData) {
    return menuData.map((info) => {
      if (info.type === 'item') {
        return (
          <Menu.Item key={info.itemKey} itemKey={info.itemKey}>
            {info.label}
          </Menu.Item>
        );
      }
      if (info.type === 'subMenu') {
        return (
          <Menu.SubMenu
            key={info.subMenuKey}
            subMenuKey={info.subMenuKey}
            styleType={info.styleType}
            title={info.title}
          >
            {this.renderMenu(info.children)}
          </Menu.SubMenu>
        );
      }
    });
  }
  render() {
    const { multiple, disabled, selectable, menuData, showSelectAll, block } = this.state;
    const itemLayout = {
      labelCol: {
        span: 3,
      },
      controllerCol: {
        span: 9,
      },
    };

    return (
      <div>
        <FormElements className="demo-form">
          <FormElements.Item label="multiple" {...itemLayout}>
            <Switch
              iStyle
              checked={multiple}
              onChange={(multiple) => this.setState({ multiple })}
            />
          </FormElements.Item>
          <FormElements.Item label="disabled" {...itemLayout}>
            <Switch
              iStyle
              checked={disabled}
              onChange={(disabled) => this.setState({ disabled })}
            />
          </FormElements.Item>
          <FormElements.Item label="selectable" {...itemLayout}>
            <Switch
              iStyle
              checked={selectable}
              onChange={(selectable) => this.setState({ selectable })}
            />
          </FormElements.Item>
          <FormElements.Item label="showSelectAll" {...itemLayout}>
            <Switch
              iStyle
              checked={showSelectAll}
              onChange={(showSelectAll) => this.setState({ showSelectAll })}
            />
          </FormElements.Item>
          <FormElements.Item label="block" {...itemLayout}>
            <Switch iStyle checked={block} onChange={(block) => this.setState({ block })} />
          </FormElements.Item>
          <FormElements.Item label="refreshMenuData" {...itemLayout}>
            <Button onClick={() => this.setState({ menuData: this.generateMenuData() })}>
              refreshMenuData
            </Button>
          </FormElements.Item>
        </FormElements>
        <div className="demo-wrap">
          <Menu
            multiple={multiple}
            disabled={disabled}
            selectable={selectable}
            block={block}
            showSelectAll={showSelectAll}
            onChange={console.log}
          >
            {this.renderMenu(menuData)}
          </Menu>
        </div>
      </div>
    );
  }
}

export default Demo;
```

<API src="Menu.tsx"></API>

### SubMenu

<API src="SubMenu.tsx"></API>
