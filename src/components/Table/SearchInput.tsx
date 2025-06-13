import React, { Component } from 'react';

import Input from '../Input';

import { TableContext } from './Table';

export default class SearchInput extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <TableContext.Consumer>
        {({ handleSearch }: any) => (
          <Input.Search status="default" onSearch={handleSearch} {...rest} />
        )}
      </TableContext.Consumer>
    );
  }
}
