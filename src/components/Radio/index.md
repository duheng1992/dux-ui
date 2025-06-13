---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 2
---

# Radio

## Checked Radio

```tsx
import React, { useState } from 'react';
import { Radio } from 'dux-ui';

const { Size } = Radio;

// demo start
const CheckedDemo = () => {
  const [value, setValue] = useState('sm');

  return (
    <div>
      <div className="demo-wrap">
        <Radio checked={false}>common</Radio>
      </div>
      <div className="demo-wrap">
        <Radio checked>checked</Radio>
      </div>

      <div className="demo-wrap">
        受控：{value}
        <Radio.Group
          options={Size.map((size) => ({ value: size, label: size, checked: value === size }))}
          value={value}
          onChange={(size) => setValue(size)}
        />
      </div>
    </div>
  );
};
// demo end

export default CheckedDemo;
```

## Disabled Radio

```tsx
import React from 'react';
import { Radio } from 'dux-ui';

// demo start
const DisabledDemo = () => (
  <div>
    <div className="demo-wrap">
      <Radio disabled>disabled</Radio>
    </div>
  </div>
);
// demo end

export default DisabledDemo;
```

## Size Radio

```tsx
import React from 'react';
import { Radio } from 'dux-ui';

const { Size } = Radio;

// demo start
const SizeDemo = () => (
  <div>
    {Size.map((size) => (
      <div className="demo-wrap" key={size}>
        <Radio size={size}>{size}</Radio>
      </div>
    ))}
  </div>
);
// demo end

export default SizeDemo;
```

## StyleType Radio

```tsx
import React from 'react';
import { Radio, Combine } from 'dux-ui';

const { StyleType } = Radio;
const list = [
  { checked: false },
  { checked: true },
  { disabled: true },
  { checked: true, disabled: true },
];

// demo start
const StyleTypeDemo = () => (
  <div style={{ fontSize: '12px' }}>
    {'styleType: ' + StyleType.toString()}

    {StyleType.map((styleType) =>
      styleType === 'list' ? (
        <div className="demo-wrap" key={styleType}>
          {list.map((props, i) => (
            <Radio styleType={styleType} key={i} {...props}>
              {styleType}
            </Radio>
          ))}
        </div>
      ) : (
        <Combine className="demo-wrap" key={styleType}>
          {list.map((props, i) => (
            <Radio styleType={styleType} key={i} {...props}>
              {styleType}
            </Radio>
          ))}
        </Combine>
      ),
    )}
    <Combine className="demo-wrap">
      {list.map((props, i) => (
        <Radio styleType="card" title="card" key={i} {...props} />
      ))}
    </Combine>
    <div className="demo-wrap">
      {list.map((props, i) => (
        <div key={i}>
          <Radio styleType="list" extra={<span>备注</span>} {...props}>
            <p>title</p>
            <p>content</p>
          </Radio>
        </div>
      ))}
    </div>
    <div className="demo-wrap">
      {list.map((props, i) => (
        <div key={i}>
          <Radio styleType="list" extra={<span>备注</span>} {...props}>
            longcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontentlongcontent
          </Radio>
        </div>
      ))}
    </div>
  </div>
);
// demo end

export default StyleTypeDemo;
```

<API></API>
