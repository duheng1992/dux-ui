import React from 'react';
import { StyledComponent } from '@emotion/styled';
import { Theme } from './interface';
declare type Input<
  Props extends {
    className?: string;
  },
> = Omit<Partial<Props>, 'className'> & {
  className?: string | ((props: Props) => string);
};
/**
 * 包裹组件，注入默认主题，添加默认的 props
 * @param input {object} 需要注入组件的 props
 */
declare const styleWrap: <Props, IHTMLElement = HTMLElement>(
  input?: Input<Props> | undefined,
  options?:
    | {
        ignoreProps?: (keyof Props)[] | undefined;
      }
    | undefined,
) => (
  Comp: StyledComponent<Props, Props & React.HTMLAttributes<IHTMLElement>, Theme>,
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    Props &
      React.HTMLAttributes<IHTMLElement> & {
        theme?: Theme | undefined;
      }
  > &
    React.RefAttributes<IHTMLElement>
>;
export default styleWrap;
