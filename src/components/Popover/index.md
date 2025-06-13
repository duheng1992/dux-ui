---
group:
  title: 弹出层组件
  path: /components/overlayEle
  order: 2

order: 0
---

# Popover

## Trigger Demo

```tsx
import React from 'react';
import { Popover } from 'dux-ui';

const { Trigger } = Popover;

const Popup = () => (
  <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>
);
const Content = (props) => (
  <button
    style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', marginLeft: 5 }}
    {...props}
  />
);

// demo start
const TriggerDemo = () => (
  <>
    {'Trigger: ' + Trigger.toString()}
    <div className="demo-wrap">
      {Trigger.map((trigger) => (
        <div className="demo-block" key={'key' + trigger}>
          <Popover trigger={[trigger]} popup={<Popup />}>
            <Content>{'' + trigger}</Content>
          </Popover>
        </div>
      ))}
    </div>
  </>
);
// demo end

export default TriggerDemo;
```

## Animation Demo

```tsx
import React from 'react';
import { Popover } from 'dux-ui';

const { Animation } = Popover;

const Popup = () => (
  <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>
);
const Content = (props) => (
  <button
    style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', marginLeft: 5 }}
    {...props}
  />
);

// demo start
const AnimationDemo = () => (
  <>
    {'Animation: ' + Animation.toString()}
    <div className="demo-wrap">
      {Animation.map((animation) => (
        <Popover key={'key' + animation} animation={animation} popup={<Popup />}>
          <Content>{'' + animation}</Content>
        </Popover>
      ))}
    </div>
  </>
);
// demo end

export default AnimationDemo;
```

## Placement Demo

```tsx
import React from 'react';
import { Popover } from 'dux-ui';

const { Placement } = Popover;

const Popup = () => (
  <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>
);
const Content = (props) => (
  <button
    style={{ width: 100, height: 40, background: '#ddd', display: 'inline-block', margin: 5 }}
    {...props}
  />
);

// demo start
const PlacementDemo = () => (
  <>
    {'Placement: ' + Placement.toString()}
    <div className="demo-wrap">
      {Placement.map((placement) => (
        <Popover key={'key' + placement} placement={placement} popup={<Popup />}>
          <Content>{'' + placement}</Content>
        </Popover>
      ))}
    </div>
  </>
);
// demo end

export default PlacementDemo;
```

## Stretch Demo

```tsx
import React from 'react';
import { Popover } from 'dux-ui';

const Popup = () => <div style={{ border: '1px solid #ddd' }}>This is a popup</div>;
const Content = (props) => (
  <button
    style={{ width: 200, height: 100, background: '#ddd', display: 'inline-block', margin: 5 }}
    {...props}
  />
);
const popupStyle = {
  border: '1px solid red',
  padding: 10,
  background: 'white',
  boxSizing: 'border-box',
};

// demo start
const StretchDemo = () => (
  <>
    <div>
      <div className="demo-wrap">
        <Popover placement="top" popup={<Popup />} popupStyle={popupStyle}>
          <Content>default</Content>
        </Popover>
      </div>
      <div className="demo-wrap">
        <Popover placement="top" popup={<Popup />} popupStyle={popupStyle} stretch={['width']}>
          <Content>width</Content>
        </Popover>
      </div>
      <div className="demo-wrap">
        <Popover
          placement="right"
          popup={<Popup />}
          popupStyle={popupStyle}
          stretch={['minHeight']}
        >
          <Content>minHeight</Content>
        </Popover>
      </div>
      <div className="demo-wrap">
        <Popover
          placement="right"
          popup={<Popup />}
          popupStyle={popupStyle}
          stretch={['height', 'width']}
        >
          <Content>height, width</Content>
        </Popover>
      </div>
    </div>
  </>
);
// demo end

export default StretchDemo;
```

## PointerFollow Demo

```tsx
import React from 'react';
import { Popover } from 'dux-ui';

const Popup = () => (
  <div style={{ height: 30, border: '1px solid #ddd', background: '#fff' }}>This is a popup</div>
);
const Content = (props) => (
  <div
    style={{ width: 80, height: 50, background: '#ddd', display: 'inline-block', marginLeft: 5 }}
    {...props}
  />
);

// demo start
const PointerFollowDemo = () => (
  <>
    <div className="demo-wrap">
      <Popover popup={<Popup />} alignPoint>
        <Content>hover me</Content>
      </Popover>
    </div>
  </>
);
// demo end

export default PointerFollowDemo;
```

## Controlled Demo

```tsx
import React, { useState } from 'react';
import { Popover } from 'dux-ui';

const Popup = () => (
  <div style={{ maxHeight: 200, border: '1px solid #ddd', background: '#fff', overflow: 'auto' }}>
    <div style={{ height: 10000, background: '#ddd' }}>This is a popup</div>
  </div>
);
const Content = (props) => (
  <div
    style={{ width: 80, height: 50, background: '#ddd', display: 'inline-block', marginLeft: 5 }}
    {...props}
  />
);
// demo start
const ControlledDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="demo-wrap">
      <Popover popup={<Popup />} visible={visible}>
        <Content>Content</Content>
      </Popover>
      <button onClick={() => setVisible(!visible)}>toggle</button>
    </div>
  );
};
// demo end

export default ControlledDemo;
```

## Container Demo

```tsx
import React, { useState } from 'react';
import { Popover, Button } from 'dux-ui';

const Demo1 = () => (
  <div>
    <div>
      默认容器为 body，可以显示，但滚动时由于容器和元素不在一个滚动层中，会导致偏移，体验较差
    </div>
    <div>
      <Button>This is a action button</Button>
      <Button>This is a action button</Button>
    </div>
    <div>
      <Popover
        popup={
          <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
            This is the popup
          </div>
        }
      >
        <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
      </Popover>
    </div>
    <div>
      <Button style={{ float: 'right' }}>This is a footer button</Button>
    </div>
  </div>
);
const Demo2 = () => (
  <div>
    <div comment="This is the comment">
      使用父容器作为容器，如果上层有定位容器，并再上层嵌套了滚动容器，会导致弹出层无法脱离，定位出现问题且滚动会闪烁
    </div>
    <div>
      <Button>This is a action button</Button>
      <Button>This is a action button</Button>
    </div>
    <div>
      <div style={{ position: 'relative' }}>
        <Popover
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          popup={
            <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
              This is the popup
            </div>
          }
        >
          <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Popover>
      </div>
    </div>
    <div>
      <Button style={{ float: 'right' }}>This is a footer button</Button>
    </div>
  </div>
);
const Demo3 = () => (
  <div>
    <div>
      <Button>This is a action button</Button>
      <Button>This is a action button</Button>
    </div>
    <div>
      <div style={{ position: 'relative' }}>
        <Popover
          forwardPopupContainer
          popup={
            <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
              This is the popup
            </div>
          }
        >
          <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
        </Popover>
      </div>
    </div>
    <div>
      <Button style={{ float: 'right' }}>This is a footer button</Button>
    </div>
  </div>
);
const Demo4 = () => (
  <div>
    <h2>使用 function 的 forwardPopupContainer 来做容器的 fallback</h2>
    <div style={{ position: 'relative' }}>
      <Popover
        forwardPopupContainer={(triggerNode) => triggerNode.parentNode}
        popup={
          <div style={{ background: '#ccc', width: 300, height: 300, padding: 20 }}>
            This is the popup
          </div>
        }
      >
        <div style={{ background: '#e1e6f0', height: 50, padding: 10 }}>This is the content</div>
      </Popover>
    </div>
  </div>
);

// demo start
const ContainerDemo = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="demo-wrap">
        <Demo1 />
      </div>
      <div className="demo-wrap">
        <Demo2 />
      </div>
      <div className="demo-wrap">
        <Demo3 />
      </div>
      <div className="demo-wrap">
        <Demo4 />
      </div>
    </div>
  );
};
// demo end

export default ContainerDemo;
```

<API></API>
