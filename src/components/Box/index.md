---
group:
  title: 基础组件
  path: /components/baseEle
  order: 0

order: 2
---

# Box

## Space Box

```tsx
import React, { useState } from 'react';

import { Box } from 'dux-ui';

// demo start
const SpaceDemo = () => {
  return (
    <div className="demo-wrap">
      <Box container direction="column" spacing="md">
        {Box.Spacing.concat([100]).map((spacing) => (
          <div className="demo-wrap" key={spacing}>
            <h2>spacing: {spacing}</h2>
            <Box container spacing={spacing}>
              {[1, 2, 3].map((v) => (
                <div
                  key={v}
                  style={{
                    height: '30px',
                    width: '100px',
                    background: 'skyblue',
                    color: 'white',
                    lineHeight: '30px',
                    textAlign: 'center',
                  }}
                ></div>
              ))}
            </Box>
          </div>
        ))}
        <div className="demo-wrap">
          <h2>spacing: {`['md', 100]`}</h2>
          <Box container wrap="wrap" spacing={['md', 100]}>
            {new Array(12).fill(null).map((v, i) => (
              <div
                key={i}
                style={{
                  height: '30px',
                  width: '300px',
                  background: 'skyblue',
                  color: 'white',
                  lineHeight: '30px',
                  textAlign: 'center',
                }}
              ></div>
            ))}
          </Box>
        </div>
      </Box>
    </div>
  );
};
// demo end

export default SpaceDemo;
```

## Direction Box

```tsx
import React, { useState } from 'react';

import { Box } from 'dux-ui';

// demo start
const DirectionDemo = () => {
  return (
    <div className="demo-wrap">
      <Box container direction="column" spacing="md">
        {['row', 'row-reverse', 'column', 'column-reverse'].map((direction) => (
          <div className="demo-wrap" key={direction}>
            <h2>direction: {direction}</h2>
            <Box container direction={direction} spacing="md">
              {[1, 2, 3].map((v) => (
                <div
                  key={v}
                  style={{
                    height: '30px',
                    width: '100px',
                    background: 'skyblue',
                    color: 'white',
                    lineHeight: '30px',
                    textAlign: 'center',
                  }}
                >
                  div - {v}
                </div>
              ))}
            </Box>
          </div>
        ))}
      </Box>
    </div>
  );
};
// demo end

export default DirectionDemo;
```

## JustifyContent Box

```tsx
import React, { useState } from 'react';

import { Box } from 'dux-ui';

// demo start
const JustifyContentDemo = () => {
  return (
    <div className="demo-wrap">
      <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'space-between', 'space-around'].map(
          (justifyContent) => (
            <div className="demo-wrap" key={justifyContent}>
              <h2>justifyContent: {justifyContent}</h2>
              <Box container justifyContent={justifyContent} wrap="wrap" spacing="md">
                {new Array(6).fill(null).map((v, i) => (
                  <div
                    key={i}
                    style={{
                      height: '30px',
                      width: '100px',
                      background: 'skyblue',
                      color: 'white',
                      lineHeight: '30px',
                      textAlign: 'center',
                    }}
                  >
                    div - {i}
                  </div>
                ))}
              </Box>
            </div>
          ),
        )}
      </Box>
    </div>
  );
};
// demo end

export default JustifyContentDemo;
```

## AlignItems Box

```tsx
import React, { useState } from 'react';

import { Box } from 'dux-ui';

// demo start
const AlignItemsDemo = () => {
  return (
    <div className="demo-wrap">
      <Box container direction="column" spacing="md">
        {['center', 'flex-start', 'flex-end', 'stretch'].map((alignItems) => (
          <div className="demo-wrap" key={alignItems}>
            <h2>alignItems: {alignItems}</h2>
            <Box container alignItems={alignItems} spacing={['md', 'md']}>
              {new Array(3).fill(null).map((v, i) => (
                <div
                  key={i}
                  style={{
                    minHeight: 30 + i * 10 + 'px',
                    width: '100px',
                    background: 'skyblue',
                    color: 'white',
                    lineHeight: '30px',
                    textAlign: 'center',
                  }}
                >
                  div - {i}
                </div>
              ))}
            </Box>
          </div>
        ))}
      </Box>
    </div>
  );
};
// demo end

export default AlignItemsDemo;
```

## Grid Box

```tsx
import React, { useState } from 'react';

import { Box } from 'dux-ui';

// demo start
const GridDemo = () => {
  return (
    <div className="demo-wrap">
      <Box container spacing={['md', 'md']} wrap="wrap">
        {[1, 2, 3, 4, 6, 6, 2.5, 2.5, 2.5, 4.5].map((v, i) => (
          <Box key={i} span={v}>
            <div
              style={{
                height: '30px',
                background: 'skyblue',
                color: 'white',
                lineHeight: '30px',
                textAlign: 'center',
              }}
            >
              span: {v}
            </div>
          </Box>
        ))}
      </Box>
    </div>
  );
};
// demo end

export default GridDemo;
```

<API></API>
