---
group:
  title: 基础组件
  path: /components/baseEle
  order: 0

order: 5
---

# Collapse

## Controlled

```tsx
import React from 'react';
import { Collapse, Button } from 'dux-ui';

// demo start
class PanelTitle extends React.Component {
  render() {
    const { toggle, children } = this.props;
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ border: '1px solid #ccc', height: 28, lineHeight: '28px', padding: 10 }}
      >
        {children}
        <Button onClick={() => toggle()} style={{ float: 'right' }}>
          toggle
        </Button>
      </div>
    );
  }
}

class ControlledDemo extends React.Component {
  render() {
    return (
      <div>
        <Collapse.Panel
          title={(props) => <PanelTitle {...props}>title</PanelTitle>}
          onChange={(v) => {
            console.log(v);
          }}
        >
          Content
        </Collapse.Panel>
      </div>
    );
  }
}
// demo end

export default ControlledDemo;
```

<API src="Collapse.tsx"></API>

### Panel

<API src="Panel.tsx" hideTitle></API>
