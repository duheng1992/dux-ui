---
group:
  title: 基础组件
  path: /components/baseEle
  order: 0

order: 4
---

# Grid

## gutter

```tsx
// demo start
import React, { useState } from 'react';

import { Grid, Icon } from 'dux-ui';

const { Row, Col } = Grid;
const style = { background: 'skyblue', height: 20, border: '1px solid gray' };
const gutters = [0, 2, 4, 8, 16, [8, 8], [4, 32]];

const AlignDemo = () => (
  <div>
    {gutters.map((gutter) => (
      <div className="demo-wrap" key={gutter}>
        {'gutter: ' + gutter + ''}
        <Row gutter={gutter}>
          <Col span={3}>
            <div style={style} />
          </Col>
          <Col span={3}>
            <div style={style} />
          </Col>
          <Col span={3}>
            <div style={style} />
          </Col>
          <Col span={3}>
            <div style={style} />
          </Col>
          <Col span={3}>
            <div style={style} />
          </Col>
          <Col span={3}>
            <div style={style} />
          </Col>
        </Row>
      </div>
    ))}
  </div>
);

// demo end

export default AlignDemo;
```

<API></API>
