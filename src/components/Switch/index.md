---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 4
---

# Switch

## Size Switch

```tsx
import React from 'react';
import { Switch } from 'dux-ui';

const { Sizes } = Switch;

// demo start
const SizeDemo = () => (
  <div>
    {Sizes.map((size) => (
      <div className="demo-wrap" key={size}>
        <Switch size={size} />
      </div>
    ))}
  </div>
);
// demo end

export default SizeDemo;
```

## OnOffText Switch

```tsx
import React from 'react';
import { Switch } from 'dux-ui';

// demo start
const OnOffTextDemo = () => (
  <div>
    <div className="demo-wrap">
      <Switch onText="开启" offText="禁用" />
    </div>
    <div className="demo-wrap">
      <Switch onText="🌞" offText="🌜" />
    </div>
  </div>
);
// demo end

export default OnOffTextDemo;
```

## Checked Switch

```tsx
import React from 'react';
import { Switch } from 'dux-ui';

// demo start
const CheckedDemo = () => (
  <div>
    <div className="demo-wrap">
      <Switch checked />
    </div>
  </div>
);
// demo end

export default CheckedDemo;
```

## IphoneStyle Switch

```tsx
import React from 'react';
import { Switch } from 'dux-ui';

// demo start
const IStyleDemo = () => (
  <div>
    <div className="demo-wrap">
      <Switch iStyle onText="开启" offText="禁用" />
    </div>
  </div>
);
// demo end

export default IStyleDemo;
```

## CustomStyle Switch

```tsx
import React from 'react';
import { Switch } from 'dux-ui';

// demo start
const CustomStyleDemo = () => (
  <div>
    <div className="demo-wrap">
      <Switch
        iStyle
        customStyle={{ background: 'blue', color: 'white' }}
        onText="开启"
        offText="禁用"
      />
    </div>
  </div>
);
// demo end

export default CustomStyleDemo;
```

<API></API>
