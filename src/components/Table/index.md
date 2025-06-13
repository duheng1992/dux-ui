---
group:
  title: 弹出层组件
  path: /components/overlayEle
  order: 1

order: 3
---

# Table

## Base Demo

```tsx
import React from 'react';
import { Table, Box, Combine, Button, Menu } from 'dux-ui';

class BaseDemo extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
          options: [1, 2, 3, 4],
        },
        order: true,
      },
      {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        filter: {
          options: [1, 2, 3, 4],
          multiple: true,
        },
      },
      {
        title: 'Operations',
        dataIndex: '',
        key: 'operation',
        render: (text, record) => (
          <a onClick={(e) => this.handleRemove(record.key, e)} href="#">
            Remove
          </a>
        ),
      },
    ];
    let data = [];
    data.length = 100;
    data.fill({});
    data = data.map((d, i) => ({
      key: i + '',
      name: `name-${i}`,
      desc: `desc-${i}`,
    }));
    this.state = {
      data,
      selectedRowKeys: [],
    };
  }
  handleRemove(key, e) {
    e.preventDefault();
    const data = this.state.data.filter((item) => item.key !== key);
    this.setState({ data });
    this.setState({
      selectedRowKeys: this.state.selectedRowKeys.filter((_key) => _key !== key),
    });
  }
  handleAdd() {
    const data = [...this.state.data];
    const key = Date.now();
    data.unshift({
      name: `name-${key}`,
      desc: `desc-${key}`,
      key: Date.now(),
    });
    this.setState({ data });
  }
  handleRemoveSelected() {
    const { selectedRowKeys } = this.state;
    const data = this.state.data.filter(
      (record) => _.findIndex(selectedRowKeys, (key) => key === '' + record.key) < 0,
    );
    this.setState({ data });
    this.setState({
      selectedRowKeys: [],
    });
  }
  render() {
    const { selectedRowKeys } = this.state;
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys) => {
            this.setState({ selectedRowKeys });
          },
        }}
        title={() => {
          return (
            <Box container justifyContent="space-between">
              <Combine>
                <Button onClick={() => this.handleAdd()} styleType="primary">
                  新增
                </Button>
                <Button
                  disabled={!selectedRowKeys || !selectedRowKeys.length}
                  onClick={() => this.handleRemoveSelected()}
                >
                  删除
                </Button>
              </Combine>
              <Combine>
                <Table.SearchInput />
                <Table.ColumnConfigButton />
              </Combine>
            </Box>
          );
        }}
        contextMenu={(record, hide) => (
          <Menu selectable={false}>
            <Menu.Item
              onClick={(e) => {
                this.handleRemove(record.key, e);
                hide();
              }}
            >
              Remove
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                console.log(record);
                hide();
              }}
            >
              Log
            </Menu.Item>
          </Menu>
        )}
      />
    );
  }
}

export default BaseDemo;
```

## Action Demo

```tsx
import React from 'react';
import { Table } from 'dux-ui';

class ActionDemo extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
          options: [1, 2, 3, 4],
        },
        order: true,
      },
      {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
        filter: {
          options: [1, 2, 3, 4],
          multiple: true,
        },
      },
      {
        title: 'Operations',
        dataIndex: '',
        key: 'operation',
        render: (text, record) => (
          <div>
            <div ref={(_ref) => (this.container = _ref)} />
            <Table.ActionList
              exposeCount={2}
              actionList={new Array(6).fill(null).map((v, i) => ({
                label: `Action ${i}`,
                onClick: (e) => console.log('action', i, e),
              }))}
              dropdownButton={{
                styleType: 'primary',
                children: 'more',
              }}
              popoverProps={{
                getPopupContainer: () => this.container,
                animation: 'slide-up',
              }}
            />
          </div>
        ),
      },
    ];
    let data = [];
    data.length = 100;
    data.fill({});
    data = data.map((d, i) => ({
      key: i + '',
      name: `name-${i}`,
      desc: `desc-${i}`,
    }));
    this.state = {
      data,
    };
  }

  render() {
    return <Table columns={this.columns} dataSource={this.state.data} />;
  }
}

export default ActionDemo;
```

## Freeze Column Demo

```tsx
import React from 'react';
import { Table } from 'dux-ui';

class FreezeColumnDemo extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        // fixed: true,
      },
      {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc',
        width: 200,
      },
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name1',
        width: 100,
        filter: {
          options: [1, 2, 3, 4],
        },
      },
      {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc2',
        width: 300,
      },
      {
        title: 'desc',
        dataIndex: 'desc',
        key: 'desc3',
        width: 100,
        fixed: true,
        filter: {
          options: [1, 2, 3, 4],
        },
      },
    ];
    let data = [];
    data.length = 100;
    data.fill({});
    data = data.map((d, i) => ({
      key: i + '',
      name: `name-${i}`,
      desc: `desc-${i}`,
    }));
    this.state = {
      data,
    };
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        rowSelection={{ fixed: true }}
        columnPlaceholder
        scroll={{ x: 1200, y: 300 }}
      />
    );
  }
}

export default FreezeColumnDemo;
```

## Fetch Demo

```tsx
import React from 'react';
import { Table, Loading, Pagination } from 'dux-ui';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pagination: {
        total: 0,
      },
    };
  }

  componentDidMount() {
    this.fetch({
      current: 1,
      pageSize: 10,
    });
  }

  fetch(params) {
    console.log('params: ', params);
    const { current, pageSize } = params;
    this.setState({
      loading: true,
      pagination: {
        ...this.state.pagination,
        current,
        pageSize,
      },
    });
    return new Promise((resolve) => {
      const data = new Array(pageSize).fill(null).map((v, i) => ({
        index: i + (current - 1) * pageSize,
      }));
      setTimeout(() => {
        resolve({
          dataSource: data,
          total: 101,
        });
      }, 1000);
    }).then((result) => {
      this.setState({
        loading: false,
        dataSource: result.dataSource,
        pagination: {
          ...this.state.pagination,
          total: result.total,
        },
      });
    });
  }

  handlePaginationChange(current, pageSize) {
    this.fetch({
      current,
      pageSize,
    });
  }

  render() {
    const { dataSource, pagination, loading } = this.state;
    const columns = new Array(5).fill(null).map((v, i) => ({
      title: `title-${i}`,
      key: `title-${i}`,
      width: 200,
      filter: {
        options: [1, 2, 3, 4],
        multiple: true,
      },
      render: (record) => <span>content {record.index}</span>,
    }));

    return (
      <Loading loading={loading} tip="Loading ...">
        <Table
          pagination={null}
          rowKey="index"
          dataSource={dataSource}
          columns={columns}
          footer={() => (
            <Pagination
              style={{ marginTop: 10, float: 'right' }}
              {...pagination}
              showSizeChanger
              size="sm"
              onChange={(...args) => this.handlePaginationChange(...args)}
              onPageSizeChange={(...args) => this.handlePaginationChange(...args)}
            />
          )}
        />
      </Loading>
    );
  }
}

export default FetchDemo;
```

## useBackendPagination Demo

```tsx
import React from 'react';
import { Table, Loading, Pagination } from 'dux-ui';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        onChange: (...args) => this.handlePaginationChange(...args),
        onPageSizeChange: (...args) => this.handlePaginationChange(...args),
      },
    };
  }
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const {
      order,
      filters,
      searchValue,
      pagination: { current, pageSize },
    } = this.state;

    const params = {
      Order: order,
      Filters: _.map(filters, (filter) => {
        return {
          Key: filter.key,
          Option: filter.value,
        };
      }),
      Search: searchValue,
      Current: current,
      Limit: pageSize,
    };
    console.log('params: ', params);
    this.setState({
      loading: true,
    });
    return new Promise((resolve) => {
      const data = new Array(pageSize).fill(null).map((v, i) => {
        const index = i + (current - 1) * pageSize;
        return {
          index,
          name: `name - ${index}`,
          describe: `describe - ${index}`,
          random: (Math.random() * 1000) | 0,
        };
      });
      setTimeout(() => {
        resolve({
          dataSource: data,
          total: 1001,
        });
      }, 1000);
    }).then((result) => {
      this.setState({
        loading: false,
        dataSource: result.dataSource,
        pagination: {
          ...this.state.pagination,
          total: result.total,
        },
      });
    });
  }
  handlePaginationChange(current, pageSize) {
    this.setState(
      {
        pagination: { ...this.state.pagination, current, pageSize },
      },
      () => {
        this.fetch();
      },
    );
  }
  handleConditionChange(condition) {
    this.setState(
      {
        ...condition,
      },
      () => {
        this.fetch();
      },
    );
  }
  render() {
    const { dataSource, pagination, loading } = this.state;

    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        filter: {
          options: [1, 2, 3, 4],
        },
        order: true,
      },
      {
        title: 'describe',
        dataIndex: 'describe',
        key: 'describe',
        width: 200,
        filter: {
          options: [1, 2, 3, 4],
          multiple: true,
        },
        order: true,
      },
      {
        title: 'random',
        key: 'random',
        dataIndex: 'random',
      },
    ];
    return (
      <div>
        <div className="demo-wrap">
          <Loading loading={loading} tip="Loading ...">
            <Table
              title={() => {
                return (
                  <div className="clear-fixed">
                    <div style={{ float: 'right' }}>
                      <Table.SearchInput style={{ marginRight: 8 }} />
                    </div>
                  </div>
                );
              }}
              pagination={pagination}
              rowKey="index"
              dataSource={dataSource}
              columns={columns}
              onConditionChange={(condition) => {
                console.log(condition);
                this.handleConditionChange(condition);
              }}
              //  自行处理筛选等逻辑
              doNotHandleCondition
            />
          </Loading>
        </div>
      </div>
    );
  }
}

export default Demo;
```

<API src="Table.tsx"></API>
