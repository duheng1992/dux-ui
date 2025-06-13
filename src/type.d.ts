import React, { ComponentClass, FC } from 'react';
import { DesignToken } from './style';
export declare type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export declare const tuple: <T extends string[]>(...args: T) => T;
export declare const Sizes: ['sm', 'md', 'lg'];
export declare type Size = typeof Sizes[number];
export declare const SizeDTMap: Record<Size, DesignToken>;
export declare const ExportComponent: <
  C extends React.ComponentType<any>,
  P extends Record<string, unknown>,
>(
  Component: C,
  ComponentExtends: P,
) => C & P;
export declare const FunctionToClassComponent: <T>(
  FComponent: React.FC<T>,
) => React.ComponentClass<T, any>;
