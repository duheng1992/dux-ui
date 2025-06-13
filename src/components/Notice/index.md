---
group:
  title: 数据展示组件
  path: /components/dataEle
  order: 3

order: 0
---

# Notice

```tsx
import React from 'react';
import { Notice } from 'dux-ui';

const { StyleType } = Notice;
const layout = { style: { marginBottom: 8 } };

const Demo = () => {
  return (
    <div>
      {StyleType.map((styleType) => (
        <Notice
          key={styleType}
          styleType={styleType}
          onClose={(e) => {
            console.log('closed', styleType);
          }}
          {...layout}
        >
          Notice content
        </Notice>
      ))}
    </div>
  );
};

export default Demo;
```

<API></API>
