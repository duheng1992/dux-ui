import Color from 'color';

(window as any).Color = Color;

export const tint = (color: any, weight: any) =>
    Color(color)
        .mix(Color('#fff'), weight)
        .string();
