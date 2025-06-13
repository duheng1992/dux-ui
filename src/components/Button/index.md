---
group:
  title: 基础组件
  path: /components/baseEle
  order: 0

order: 1
---

# Button

## Theme Button

```tsx
import React, { useState } from 'react';

import { Button, ThemeDark, ThemeDefault, ConfigProvider, ThemeProvider } from 'dux-ui';

const { StyleTypes } = Button;

// demo start
const ThemeDemo = () => {
  const [isThemeDark, setIsThemeDark] = useState(true);
  const [theme, setTheme] = useState(ThemeDark);

  const { useDesignTokens } = ThemeProvider;
  const DT = useDesignTokens();

  return (
    <div>
      change Theme
      <form>
        <label>
          Default:{' '}
          <input
            id="default"
            name="theme"
            type="radio"
            value={false}
            checked={!isThemeDark}
            onChange={() => {
              setIsThemeDark(false);
              setTheme(ThemeDefault);
            }}
          />
        </label>
        <br />
        <label>
          Dark:{' '}
          <input
            id="dark"
            name="theme"
            type="radio"
            value={true}
            checked={isThemeDark}
            onChange={() => {
              setIsThemeDark(true);
              setTheme(ThemeDark);
            }}
          />
        </label>
      </form>
      <ConfigProvider theme={theme}>
        <div className="demo-wrap">
          {StyleTypes.map((type) => (
            <Button styleType={type} key={type} onClick={() => console.log('clicked')}>
              Button
            </Button>
          ))}
        </div>
      </ConfigProvider>
    </div>
  );
};
// demo end

export default ThemeDemo;
```

## Shape Button

```tsx
import React from 'react';

import { Button } from 'dux-ui';

// demo start
const ShapeDemo = () => {
  return (
    <div className="demo-wrap">
      <Button onClick={() => console.log('clicked')}>Button</Button>
      <Button
        shape="circle"
        styleType="primary"
        icon="upload"
        onClick={() => console.log('clicked')}
      />
      <Button
        shape="circle"
        styleType="border"
        icon="smile"
        onClick={() => console.log('clicked')}
      />
      <Button
        shape="square"
        styleType="primary"
        icon="upload"
        onClick={() => console.log('clicked')}
      />
      <Button
        shape="square"
        styleType="border"
        icon="smile"
        onClick={() => console.log('clicked')}
      />
    </div>
  );
};
// demo end

export default ShapeDemo;
```

## Size Button

```tsx
import React from 'react';

import { Button } from 'dux-ui';

// demo start
const { Sizes } = Button;

const SizeDemo = () => {
  // 'sm', 'md', 'lg'
  return (
    <div className="demo-wrap">
      {Sizes.map((size) => (
        <Button size={size} key={size} onClick={() => console.log('clicked')}>
          Button
        </Button>
      ))}
    </div>
  );
};
// demo end

export default SizeDemo;
```

## Shadowed Button

```tsx
import React from 'react';

import { Button } from 'dux-ui';

// demo start
const ShadowedDemo = () => {
  return (
    <div className="demo-wrap">
      <Button shadowed onClick={() => console.log('clicked')}>
        Button
      </Button>
    </div>
  );
};
// demo end

export default ShadowedDemo;
```

## StyleType Button

```tsx
import React from 'react';

import { Button } from 'dux-ui';

// demo start
const { StyleTypes } = Button;

const StyleTypeDemo = () => {
  // 'primary', 'border', 'border-gray'
  return (
    <div className="demo-wrap">
      {StyleTypes.map((styleType) => (
        <Button
          styleType={styleType}
          key={'key' + styleType}
          onClick={() => console.log('clicked')}
        >
          Button
        </Button>
      ))}
    </div>
  );
};
// demo end

export default StyleTypeDemo;
```

## Loading Button

```tsx
import React from 'react';

import { Button } from 'dux-ui';

// demo start
const LoadingDemo = () => {
  return (
    <div className="demo-wrap">
      <Button loading onClick={() => console.log('clicked')}>
        Button
      </Button>
      <Button loading onClick={() => console.log('clicked')} />
      <Button loading icon="link" styleType="primary" onClick={() => console.log('clicked')} />
    </div>
  );
};
// demo end

export default LoadingDemo;
```

## Icon Button

```tsx
import React from 'react';

import { Button, Icon } from 'dux-ui';

// demo start
const icons = ['loading', 'link', 'check'];
const IconDemo = () => {
  return (
    <div className="demo-wrap">
      {icons.map((icon) => (
        <Button icon={icon} key={icon} onClick={() => console.log('clicked')}>
          Button
        </Button>
      ))}
      {icons.map((icon) => (
        <Button icon={<Icon type={icon} spin />} key={icon} onClick={() => console.log('clicked')}>
          Button
        </Button>
      ))}
      {icons.map((icon) => (
        <Button key={icon} onClick={() => console.log('clicked')}>
          Button <Icon type={icon} spin /> Button
        </Button>
      ))}
    </div>
  );
};
// demo end

export default IconDemo;
```

## Disabled Button

```tsx
import React from 'react';

import { Button } from 'dux-ui';

// demo start
const DisabledDemo = () => (
  <div className="demo-wrap">
    <Button onClick={() => console.log('clicked')}>Button</Button>
    <Button disabled onClick={() => console.log('clicked')}>
      Button
    </Button>
  </div>
);
// demo end

export default DisabledDemo;
```

## Block Button

```tsx
import React from 'react';

import { Button } from 'dux-ui';

// demo start
const BlockDemo = () => (
  <div className="demo-wrap">
    <Button onClick={() => console.log('clicked')}>Button</Button>
    <Button block onClick={() => console.log('clicked')}>
      Button
    </Button>
  </div>
);
// demo end

export default BlockDemo;
```

<API></API>
