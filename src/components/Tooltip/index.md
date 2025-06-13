---
group:
  title: 弹出层组件
  path: /components/overlayEle
  order: 1

order: 3
---

# Tooltip

## Theme Demo

```tsx
import React from 'react';
import { Tooltip, Button } from 'dux-ui';

const { Theme } = Tooltip;

const ThemeDemo = () => {
  return (
    <div>
      {Theme.map((theme) => (
        <div className="demo-wrap" key={theme}>
          <Tooltip theme={theme} popup="tooltip message">
            <Button>{theme}</Button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default ThemeDemo;
```

## Placement Demo

```tsx
import React, { useEffect } from 'react';
import { Tooltip, Button, ConfigProvider, ThemeDark, ThemeDefault } from 'dux-ui';
import { usePrefersColor } from 'dumi/theme';

const { Placement, Theme } = Tooltip;
const themeMap = {};

const PlacementDemo = () => {
  useEffect(() => {
    Theme.forEach((item) => {
      themeMap[item] = item === 'dark' ? ThemeDark : ThemeDefault;
    });
  }, []);
  const theme = usePrefersColor()[0];
  return (
    <div>
      {Placement.map((placement) => (
        <div
          key={placement}
          style={{ margin: '40px 80px', display: 'inline-block', position: 'relative' }}
        >
          <Tooltip placement={placement} popup={placement} theme={theme} visible>
            <ConfigProvider theme={themeMap[theme]}>
              <Button icon="smile">Button</Button>
            </ConfigProvider>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default PlacementDemo;
```

<API src="index.tsx"></API>
