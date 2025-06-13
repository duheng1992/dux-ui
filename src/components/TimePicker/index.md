---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 7
---

# TimePicker

## Size Demo

```tsx
import React from 'react';
import { TimePicker } from 'dux-ui';
console.log(TimePicker.Size);
// demo start
const SizeDemo = () => (
  <div>
    {['sm', 'md', 'lg'].map((size) => (
      <div className="demo-wrap" key={size}>
        <TimePicker size={size} />
      </div>
    ))}
  </div>
);
// demo end

export default SizeDemo;
```

## Format Demo

```tsx
import React from 'react';
import { TimePicker } from 'dux-ui';

// demo start
const FormatDemo = () => (
  <div className="demo-wrap">
    <TimePicker format="HH - mm - ss" />
  </div>
);
// demo end

export default FormatDemo;
```

<API></API>
