---
group:
  title: 表单组件
  path: /components/formEle
  order: 1

order: 9
---

# DatePicker

## Custom Demo

```tsx
import React from 'react';
import moment from 'moment';
import { DatePicker, Form as VForm, Switch, Input, Radio } from 'dux-ui';

const Form = VForm.Elements;

const { Sizes } = DatePicker;
class defaultDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: {
        date: {
          format: 'YY-MM-DD',
          display: false,
        },
        hour: true,
        minute: true,
        second: true,
      },
      size: 'md',
    };
  }
  render() {
    const { display, disabled, size, nullable } = this.state;
    const { date, hour, minute, second } = display;
    const itemLayout = {
      labelCol: {
        span: 3,
      },
      controllerCol: {
        span: 9,
      },
    };
    return (
      <div>
        <Form className="demo-form">
          <Form.Item label="nullable" {...itemLayout}>
            <Switch
              iStyle
              checked={nullable}
              onChange={(nullable) =>
                this.setState({
                  nullable,
                })
              }
            />
          </Form.Item>
          <Form.Item label="display.date.format" {...itemLayout}>
            <Input
              value={date.format}
              onChange={(e) => {
                this.setState({
                  display: {
                    ...display,
                    date: {
                      ...date,
                      format: e.target.value,
                    },
                  },
                });
              }}
            />
          </Form.Item>
          <Form.Item label="display.hour" {...itemLayout}>
            <Switch
              iStyle
              checked={hour}
              onChange={(hour) =>
                this.setState({
                  display: {
                    ...display,
                    hour,
                  },
                })
              }
            />
          </Form.Item>
          <Form.Item label="display.minute" {...itemLayout}>
            <Switch
              iStyle
              checked={minute}
              onChange={(minute) =>
                this.setState({
                  display: {
                    ...display,
                    minute,
                  },
                })
              }
            />
          </Form.Item>
          <Form.Item label="display.second" {...itemLayout}>
            <Switch
              iStyle
              checked={second}
              onChange={(second) => {
                this.setState({
                  display: {
                    ...display,
                    second,
                  },
                });
              }}
            />
          </Form.Item>
          <Form.Item label="disabled" {...itemLayout}>
            <Switch
              iStyle
              checked={disabled}
              onChange={(disabled) => this.setState({ disabled })}
            />
          </Form.Item>
          <Form.Item label="size" {...itemLayout}>
            {size}
            <Radio.Group
              value={size}
              options={Sizes.map((value) => ({ value, checked: value === size }))}
              onChange={(size) => this.setState({ size })}
            />
          </Form.Item>
        </Form>
        <div className="demo-wrap">
          <DatePicker
            display={display}
            size={size}
            onChange={(v) => console.log(v && v.format())}
            disabled={disabled}
            nullable={nullable}
            rules={{
              range: [
                moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: -7 }),
                moment().set({ hour: 0, minute: 0, second: 0 }).add({ day: 7 }),
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

export default defaultDemo;
```

<API src="DatePicker.tsx"></API>
