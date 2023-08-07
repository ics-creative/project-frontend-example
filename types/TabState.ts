/**
 * タブ名の定数
 */
export const TAB_NAME = {
  Population: 0,
  Density: 1,
  Increase: 2,
  Changes: 3,
} as const;

/**
 * タブ名の型
 */
export type TabState = (typeof TAB_NAME)[keyof typeof TAB_NAME];
