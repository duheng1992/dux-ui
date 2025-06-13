---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 8
---

# Calendar

## default Demo

```tsx
import React from 'react';
import { Calendar } from 'dux-ui';

// demo start
const defaultDemo = () => (
  <div className="demo-wrap">
    <Calendar
      onSelect={(v) => console.log('select', v)}
      onChange={(v) => console.log('change', v)}
      rules={{
        range: [Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() + 7 * 24 * 60 * 60 * 1000],
      }}
    />
  </div>
);
// demo end

export default defaultDemo;
```

## Month Demo

```tsx
import React from 'react';
import { Calendar } from 'dux-ui';

// demo start
const MonthDemo = () => (
  <div className="demo-wrap">
    <Calendar.Month
      onSelect={(v) => console.log('select', v)}
      onChange={(v) => console.log('change', v)}
      rules={{
        range: [
          Date.now() - 3 * 30 * 24 * 60 * 60 * 1000,
          Date.now() + 3 * 30 * 24 * 60 * 60 * 1000,
        ],
      }}
    />
  </div>
);
// demo end

export default MonthDemo;
```

<API></API>
