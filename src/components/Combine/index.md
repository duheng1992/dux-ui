---
group:
  title: 基础组件
  path: /components/baseEle
  order: 0

order: 3
---

# Combine

## Button Combine

```tsx
import React, { useState } from 'react';

import { Combine, Button } from 'dux-ui';

// demo start
const ButtonDemo = () => {
  return (
    <div className="demo-wrap">
      <Combine>
        <Button styleType="primary">按钮组展示</Button>
        <Button>按钮组展示</Button>
        <Button>按钮组展示</Button>
        <Button disabled>按钮组展示</Button>
      </Combine>
    </div>
  );
};
// demo end

export default ButtonDemo;
```

## Spacing Combine

```tsx
import React, { useState } from 'react';

import { Combine, Button } from 'dux-ui';

// demo start
const SpacingDemo = () => {
  return (
    <>
      {['sm', 'md', 'lg'].map((size) => (
        <div key={size}>
          <h3>spacing: smart - {size}</h3>
          <div className="demo-wrap">
            <Combine sharedProps={{ size }}>
              <input />
              <Button styleType="primary">按钮</Button>
            </Combine>
          </div>
        </div>
      ))}
      {['sm', 'md', 'lg'].map((size) => (
        <div key={size}>
          <h3>spacing: {size}</h3>
          <div className="demo-wrap">
            <Combine spacing={size}>
              <input />
              <Button styleType="primary">按钮</Button>
            </Combine>
          </div>
        </div>
      ))}
    </>
  );
};
// demo end

export default SpacingDemo;
```

<API></API>
