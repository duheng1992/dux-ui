---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 0
---

# Input

Simple Demo:

```tsx
import React from 'react';
import { Input } from 'dux-ui';

// demo start
const SimpleDemo = () => <Input onChange={(e) => console.log('input values: ' + e.target.value)} />;

// demo end

export default SimpleDemo;
```

Size Demo:

```tsx
import React from 'react';
import { Input } from 'dux-ui';

const { Sizes } = Input;

// demo start
const SizeDemo = () => (
  <div>
    {Sizes.map((size) => (
      <div className="demo-wrap" key={size}>
        {`${size}：`}
        <Input size={size} />
      </div>
    ))}
  </div>
);
// demo end

export default SizeDemo;
```

Clearable Demo:

```tsx
import React from 'react';
import { Input } from 'dux-ui';

// demo start
const ClearableDemo = () => (
  <div>
    <div className="demo-wrap">
      <Input clearable />
    </div>
  </div>
);

// demo end

export default ClearableDemo;
```

Icon Demo:

```tsx
import React from 'react';
import { Input } from 'dux-ui';

const IconType = ['time', 'circle', 'tag'];

// demo start
const IconDemo = () => (
  <div>
    {IconType.map((icon) => (
      <div className="demo-wrap" key={icon}>
        <Input icon={icon} />
      </div>
    ))}
  </div>
);

// demo end

export default IconDemo;
```

Prefix Demo:

```tsx
import React from 'react';
import { Input, Icon } from 'dux-ui';

// demo start
const PrefixDemo = () => (
  <div>
    <div className="demo-wrap">
      <Input prefix="prefix" />
    </div>
    <div className="demo-wrap">
      <Input prefix={<Icon type="search" />} />
    </div>
    <div className="demo-wrap">
      <Input prefix="prefix" style={{ width: 300 }} />
    </div>
    <div className="demo-wrap">
      <Input prefix={<div style={{ width: 50 }}>prefix</div>} style={{ width: 300 }} />
    </div>
  </div>
);

// demo end

export default PrefixDemo;
```

Suffix Demo:

```tsx
import React from 'react';
import { Input, Icon } from 'dux-ui';

// demo start
const SuffixDemo = () => (
  <div>
    <div className="demo-wrap">
      <Input suffix="suffix" />
    </div>
    <div className="demo-wrap">
      <Input suffix={<Icon type="search" />} />
    </div>
  </div>
);

// demo end

export default SuffixDemo;
```

Status Demo:

```tsx
import React from 'react';
import { Input, Icon } from 'dux-ui';

// demo start
const StatusDemo = () => (
  <div>
    <div className="demo-wrap">
      <Input />
    </div>
    <div className="demo-wrap">
      <Input status="error" />
    </div>
  </div>
);

// demo end

export default StatusDemo;
```

Disabled Demo:

```tsx
import React from 'react';
import { Input, Icon } from 'dux-ui';

// demo start
const DisabledDemo = () => (
  <div>
    <div className="demo-wrap">
      <Input defaultValue="default value" suffix={<Icon type="search" />} prefix="search" />
    </div>
    <div className="demo-wrap">
      <Input
        disabled
        defaultValue="default value"
        suffix={<Icon type="search" />}
        prefix="search"
      />
    </div>
    <div className="demo-wrap">
      <Input
        disabled
        defaultValue="default value"
        prefix={<Icon type="search" />}
        suffix="search"
      />
    </div>
  </div>
);

// demo end

export default DisabledDemo;
```

<API></API>
