---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 10
---

# Upload

## Simple Demo

```tsx
import React from 'react';
import { Upload } from 'dux-ui';

// demo start
const SimpleDemo = () => (
  <div className="demo-wrap">
    <Upload
      onChange={(fileList) => console.log(fileList)}
      onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
    />
  </div>
);
// demo end

export default SimpleDemo;
```

## Multiple Demo

```tsx
import React from 'react';
import { Upload } from 'dux-ui';

// demo start
const MultipleDemo = () => (
  <div>
    <div className="demo-wrap">
      <Upload
        onChange={(fileList) => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
      />
    </div>
    <h5>限制文件数量：</h5>
    <div className="demo-wrap">
      <Upload
        onChange={(fileList) => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
        maxCount={3}
      />
    </div>
    <h5>限制单个文件大小：</h5>
    <div className="demo-wrap">
      <Upload
        onChange={(fileList) => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        maxSize={10 * 1024}
        multiple
      />
    </div>
    <h5>限制文件类型：</h5>
    <div className="demo-wrap">
      <Upload
        onChange={(fileList) => console.log(fileList)}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        accept="image/* , .pdf, .xlsx"
        multiple
      />
    </div>
  </div>
);
// demo end

export default MultipleDemo;
```

## Event Demo

```tsx
import React from 'react';
import { Upload } from 'dux-ui';

// demo start
const EventDemo = () => (
  <div>
    <h5>添加事件：</h5>
    <div className="demo-wrap">
      <Upload
        onChange={(fileList) => console.log(fileList)}
        onAdd={(files) => {
          console.log(files);
          if (files.length < 2) {
            alert('一次至少两个我才让你加');
            return false;
          } else if (files.length > 4) {
            alert('一次传超过4个我也不让你加');
            return false;
          }
        }}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
      />
    </div>
    <h5>删除事件：</h5>
    <div className="demo-wrap">
      <Upload
        onChange={(fileList) => console.log(fileList)}
        onRemove={(file, index) => {
          console.log(file, index);
          if (index === 0) {
            alert('这个文件我喜欢，你不能删');
            return false;
          }
        }}
        onError={({ message, name }) => alert(`there is an error of ${name}: ${message}`)}
        multiple
      />
    </div>
  </div>
);
// demo end

export default EventDemo;
```

## Preview Demo

```tsx
import React from 'react';
import { Upload, Modal } from 'dux-ui';

const { readFile } = Upload;

const handlePreview = (file) => {
  if (file.type.split('/')[0] === 'image') {
    readFile(file)
      .then((url) => {
        Modal.alert(
          {
            title: '预览',
            size: 'md',
          },
          <div style={{ textAlign: 'center' }}>
            <img src={url} width={500} />
          </div>,
        );
      })
      .catch((e) => {
        alert(e);
      });
  } else {
    Modal.alert(
      {
        title: '预览',
        size: 'md',
      },
      <div style={{ textAlign: 'center' }}>
        <div>类型{file.type}</div>
        <div>名称{file.name}</div>
      </div>,
    );
  }
};
// demo start
const PreviewDemo = () => (
  <div>
    <div className="demo-wrap">
      <Upload onPreview={handlePreview} multiple />
    </div>
  </div>
);

export default PreviewDemo;
```

<API src="Upload.tsx"></API>
