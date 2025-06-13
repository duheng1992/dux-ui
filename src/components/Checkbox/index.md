---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 6
---

# Checkbox

## Checked

```tsx
import React from 'react';
import { Checkbox } from 'dux-ui';

// demo start
const checkedDemo = () => (
  <div>
    <div className="demo-wrap">
      <Checkbox>unchecked</Checkbox>
    </div>
    <div className="demo-wrap">
      <Checkbox checked>checked</Checkbox>
    </div>
  </div>
);
// demo end

export default checkedDemo;
```

## StyleType

```tsx
import React from 'react';
import { Combine, Checkbox } from 'dux-ui';

// demo start
const StyleTypeDemo = () => (
  <div>
    <div className="demo-wrap">
      <Combine>
        <Checkbox checked={false}>checkbox</Checkbox>
        <Checkbox checked>checkbox</Checkbox>
        <Checkbox disabled>checkbox</Checkbox>
        <Checkbox checked disabled>
          checkbox
        </Checkbox>
      </Combine>
    </div>
    <div className="demo-wrap">
      <Combine>
        <Checkbox styleType="card" checked={false}>
          checkbox
        </Checkbox>
        <Checkbox styleType="card" checked>
          checkbox
        </Checkbox>
        <Checkbox styleType="card" disabled>
          checkbox
        </Checkbox>
        <Checkbox styleType="card" checked disabled>
          checkbox
        </Checkbox>
      </Combine>
    </div>
    <div className="demo-wrap">
      <Combine>
        <Checkbox styleType="card" title="title" checked={false}>
          checkbox
        </Checkbox>
        <Checkbox styleType="card" title="title" checked>
          checkbox
        </Checkbox>
        <Checkbox styleType="card" title="title" disabled>
          checkbox
        </Checkbox>
        <Checkbox styleType="card" title="title" checked disabled>
          checkbox
        </Checkbox>
      </Combine>
    </div>
  </div>
);
// demo end

export default StyleTypeDemo;
```

<API></API>
