---
group:
  title: 基础组件
  path: /components/baseEle
  order: 0

order: 0
---

# Icon

Type Demo:

```tsx
import React from 'react';
import { Icon } from 'dux-ui';
import Copy from 'copy-to-clipboard';

// demo start
const layout = {
  style: {
    fontSize: '24px',
    flex: 1,
    marginTop: '12px',
  },
};

const Icons = [
  'glass',
  'music',
  'search',
  'envelope',
  'blackheartsuit',
  'star',
  'start_empty',
  'user',
  'film',
  'th_list',
  'ok',
  'remove',
  'zoom_in',
  'zoom_out',
  'off',
  'signal',
  'setting',
  'trash',
  'home',
  'file_alt',
  'time',
  'download_alt',
  'download',
  'upload',
  'inbox',
  'play_circle',
  'repeat',
  'refresh',
  'lock',
  'flag',
  'qrcode',
  'tag',
  'book',
  'bookmark',
  'camera',
  'picture',
  'pencil',
  'edit',
  'share',
  'check',
  'move',
  'chevron_left',
  'chevron_right',
  'plus_sign',
  'minus_sign',
  'remove_sign',
  'ok_sign',
  'question_sign',
  'ban_circle',
  'plus',
  'minus',
  'chevron_down',
  'retweet',
  'folder_close',
  'folder_open',
  'double_angle_left',
  'double_angle_right',
  'angle_left',
  'angle_right',
  'angle_up',
  'angle_down',
  'circle',
  'loading',
  'whitecircle',
  'resize_full',
  'resize_small',
  'eye_open',
  'eye_close',
  'smile',
  'frown',
  'meh',
  'link',
  'mute',
  'unlock',
  'sort',
  'sort_alt',
  'doc',
  'notice',
];
const TypeDemo = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {Icons.map((item) => (
      <div
        key={item}
        style={{
          flexGrow: 0,
          flexShrink: 0,
          width: '60px',
          height: '80px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          margin: ' 0 12px 10px 0',
        }}
        onClick={() => Copy(item)}
      >
        <Icon type={item} {...layout} />
        <span
          style={{
            height: '16px',
            flexShrink: 0,
            flexGrow: 0,
            textAlign: 'center',
            color: '#888',
            wordBreak: 'break-all',
          }}
        >
          {item}
        </span>
      </div>
    ))}
  </div>
);

export default TypeDemo;
// demo end
```

Spin Demo

```tsx
import React from 'react';
import { Icon } from 'dux-ui';

// demo start
const layout = {
  style: {
    marginRight: 10,
  },
};
const SpinDemo = () => (
  <div>
    <Icon type="loading" spin={{ pulse: true }} {...layout} />
    <Icon type="loading" spin {...layout} />
  </div>
);
// demo end

export default SpinDemo;
```

Custom Style Demo

```tsx
import React from 'react';
import { Icon } from 'dux-ui';

// demo start
const layout = {
  style: {
    marginRight: 10,
  },
};
const CustomStyleDemo = () => (
  <div>
    <Icon type="folder_close" {...layout} />
    <Icon type="folder_open" {...layout} style={{ color: 'red', fontSize: '20px' }} />
  </div>
);
// demo end

export default CustomStyleDemo;
```

<API></API>
