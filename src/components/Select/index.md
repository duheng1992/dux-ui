---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 5
---

# Select

## Disabled Select

```tsx
import React from 'react';
import { Select } from 'dux-ui';

const { Option } = Select;

// demo start
const DisabledDemo = () => (
  <div>
    <div className="demo-wrap">
      <Select defaultValue={1} disabled>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
      </Select>
    </div>
    <div className="demo-wrap">
      <Select defaultValue={1}>
        <Option value={1}>1</Option>
        <Option value={2} disabled>
          2
        </Option>
        <Option value={3}>3</Option>
      </Select>
    </div>
  </div>
);
// demo end

export default DisabledDemo;
```

## Shadowed Select

```tsx
import React from 'react';
import { Select } from 'dux-ui';

const { Option } = Select;

// demo start
const ShadowedDemo = () => (
  <div>
    <div className="demo-wrap">
      <Select defaultValue={1} shadowed>
        <Option value={1}>1</Option>
        <Option value={2} disabled>
          2
        </Option>
        <Option value={3}>3</Option>
      </Select>
    </div>
  </div>
);
// demo end

export default ShadowedDemo;
```

## Multiple Select

```tsx
import React, { useState } from 'react';
import { Select } from 'dux-ui';

const { Option } = Select;

// demo start
const MultipleDemo = () => {
  const [value, setValue] = useState();

  return (
    <div className="demo-wrap">
      <Select
        value={value}
        multiple
        onChange={(v) => {
          console.log(v);
          setValue(v);
        }}
      >
        <Option value={1}>1</Option>
        <Option value={'disable'} disabled>
          disable
        </Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
      </Select>
    </div>
  );
};
// demo end

export default MultipleDemo;
```

## Extra Select

```tsx
import React, { useState } from 'react';
import { Select, Button } from 'dux-ui';

const { Option } = Select;

// demo start
const ExtraDemo = () => {
  return (
    <div className="demo-wrap">
      <Select
        extra={{
          autoHidePopup: true,
          content: (
            <Button style={{ width: '100%' }} styleType="primary" onClick={() => console.log(123)}>
              插入按钮
            </Button>
          ),
        }}
      >
        <Option value={1}>111111111</Option>
        <Option value={1}>222222222</Option>
        <Option value={1}>333333333</Option>
      </Select>
    </div>
  );
};
// demo end

export default ExtraDemo;
```

## Size Select

```tsx
import React, { useState } from 'react';
import { Select } from 'dux-ui';

const { Option, Size } = Select;

// demo start
const SizeDemo = () => {
  return (
    <div className="demo-wrap">
      {Size.map((size) => (
        <div className="demo-wrap" key={size}>
          <Select defaultValue={1} size={size}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
          </Select>
        </div>
      ))}
    </div>
  );
};
// demo end
export default SizeDemo;
```

## Search Select

```tsx
import React, { useState } from 'react';
import { Select } from 'dux-ui';

const { Option } = Select;

// demo start
const SearchDemo = () => {
  const [searchValue, setSearchValue] = React.useState('1');
  const handleSearchChange = React.useCallback((v) => {
    console.log(v);
    setSearchValue(v);
  }, []);

  return (
    <div>
      <h5>默认搜索</h5>
      <div className="demo-wrap">
        <Select defaultValue={1} search>
          <Option value={1}>哈</Option>
          <Option value={2}>嘿</Option>
          <Option value={3}>呵</Option>
        </Select>
      </div>

      <h5>受控搜索</h5>
      <div className="demo-wrap">
        <Select defaultValue={1} search={{ onSearchValueChange: handleSearchChange, searchValue }}>
          <Option value={1}>哈</Option>
          <Option value={2}>嘿</Option>
          <Option value={3}>呵</Option>
        </Select>
      </div>
    </div>
  );
};
// demo end
export default SearchDemo;
```

<API></API>
