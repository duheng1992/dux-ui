---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 1
---

# NumberInput

## Size input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

const { Size, StyleType } = NumberInput;

// demo start
const SizeDemo = () => (
  <div>
    {'styleType: ' + StyleType.toString()}
    {Size.map((size) => (
      <div className="demo-wrap" key={size}>
        {StyleType.map((styleType) => (
          <div className="demo-block" key={styleType}>
            <NumberInput styleType={styleType} size={size} />
          </div>
        ))}
      </div>
    ))}
  </div>
);
// demo end

export default SizeDemo;
```

## Shadowed input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

const { Size, StyleType } = NumberInput;

// demo start
const ShadowedDemo = () => (
  <div>
    {Size.map((size) => (
      <div className="demo-wrap" key={size}>
        {StyleType.map((styleType) => (
          <div className="demo-block" key={styleType}>
            <NumberInput shadowed styleType={styleType} size={size} />
          </div>
        ))}
      </div>
    ))}
  </div>
);
// demo end

export default ShadowedDemo;
```

## ReadOnly input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const ReadOnlyDemo = () => (
  <div>
    <div className="demo-wrap">
      <NumberInput readOnly />
    </div>
    <div className="demo-wrap">
      <NumberInput />
    </div>
  </div>
);
// demo end

export default ReadOnlyDemo;
```

## MaxMin input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const MaxMinDemo = () => (
  <div>
    <div className="demo-wrap">
      <NumberInput defaultValue={9} max={10} />
    </div>
    <div className="demo-wrap">
      <NumberInput defaultValue={11} min={10} />
    </div>
  </div>
);
// demo end

export default MaxMinDemo;
```

## Disabled input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const DisabledDemo = () => (
  <div>
    <div className="demo-wrap">
      <NumberInput disabled />
    </div>
    <div className="demo-wrap">
      <NumberInput />
    </div>
  </div>
);
// demo end

export default DisabledDemo;
```

## Formatter input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const FormatterDemo = () => (
  <div style={{ fntSize: '12px' }}>
    <div className="demo-wrap">
      <NumberInput formatter={(v) => `${v} 台`} defaultValue={3} />
    </div>
    <div className="demo-wrap">
      <NumberInput
        formatter={(v) => `买了 ${v} 个苹果`}
        defaultValue={2}
        inputStyle={{ width: 100 }}
      />
    </div>
  </div>
);
// demo end

export default FormatterDemo;
```

## RegExp input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const RegExpDemo = () => (
  <div>
    <div className="demo-wrap">
      <NumberInput parser={(v) => v.replace(/[^\d]+/g, '')} />
    </div>
    <div className="demo-wrap">
      <NumberInput parser={(v) => v.replace(/[^\d/.]+/g, '')} />
    </div>
  </div>
);
// demo end

export default RegExpDemo;
```

## Precision input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const PrecisionDemo = () => (
  <div>
    <div className="demo-wrap">
      <NumberInput defaultValue={2} precision={2} />
    </div>
    <div className="demo-wrap">
      <NumberInput defaultValue={2} precision={4} />
    </div>
  </div>
);
// demo end

export default PrecisionDemo;
```

## Step input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const StepDemo = () => (
  <div>
    <div className="demo-wrap">
      <NumberInput step={1.1} />
    </div>
    <div className="demo-wrap">
      <NumberInput step={10} />
    </div>
  </div>
);
// demo end

export default StepDemo;
```

## Suffix input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

const { StyleType } = NumberInput;
// demo start
const SuffixDemo = () => (
  <div style={{ fntSize: '12px' }}>
    {StyleType.map((styleType) => (
      <div className="demo-wrap" key={styleType}>
        <div className="demo-block">
          <NumberInput suffix="G" styleType={styleType} />
        </div>
        <div className="demo-block">
          <NumberInput suffix="台" styleType={styleType} />
        </div>
        <div className="demo-block">
          <NumberInput max={100} suffix={`/${100}`} styleType={styleType} />
        </div>
      </div>
    ))}
  </div>
);
// demo end

export default SuffixDemo;
```

## Suffix input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const ComputeValidDemo = () => (
  <div>
    <NumberInput defaultValue={2} step={2} computeValidNumber={(v) => ((v / 2) | 0) * 2} />
  </div>
);
// demo end

export default ComputeValidDemo;
```

## Tooltip input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

const { StyleType } = NumberInput;

// demo start
const TooltipDemo = () => (
  <div>
    {StyleType.map((styleType) => (
      <div className="demo-wrap" key={styleType}>
        <NumberInput styleType={styleType} tooltip="自定义提示文案" />
      </div>
    ))}
  </div>
);
// demo end

export default TooltipDemo;
```

## Uncontrolled input

```tsx
import React from 'react';
import { NumberInput } from 'dux-ui';

// demo start
const layout = {
  style: {
    margin: 8,
  },
};

class UncontrolledDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 4,
    };
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <NumberInput value={value} onChange={(value) => this.setState({ value })} {...layout} />
        <NumberInput defaultValue={3} hideHandler {...layout} />
      </div>
    );
  }
}

// demo end

export default UncontrolledDemo;
```

<API></API>
