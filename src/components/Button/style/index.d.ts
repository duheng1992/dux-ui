import React from 'react';
import { Theme } from '../../../style';
import { StyleTypes, Sizes, Shapes } from '../shared';
export declare const iconCls: string;
interface StyleButtonProps {
  styleType: typeof StyleTypes[number];
  size: typeof Sizes[number];
  shape?: typeof Shapes[number];
  shadowed?: boolean;
  loading?: boolean;
  disabled?: boolean;
  checked?: boolean;
  block?: boolean;
}
export declare const StyleButton: React.ForwardRefExoticComponent<
  StyleButtonProps &
    React.HTMLAttributes<HTMLButtonElement> & {
      theme?: Theme | undefined;
    } & React.RefAttributes<HTMLButtonElement>
>;
export {};
