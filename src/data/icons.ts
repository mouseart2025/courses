/**
 * Lucide 图标白名单 —— 单一事实源。
 *
 * 这个数组同时被消费于：
 *   1. `astro.config.mjs` 的 `icon({ include: { lucide: [...] } })` —— 决定哪些图标被打包；
 *   2. 数据层的 `IconName` 类型 —— 约束 `src/data/*.ts` 里的 icon 字段。
 *
 * 因此新增/删除图标只改这一处：build 注册与 `pnpm check` 类型约束自动同步，
 * 不会再出现"数据里加了图标、build 才炸 Unable to locate icon"的情况。
 */
export const LUCIDE_ICONS = [
  'menu',
  'x',
  'map-pin',
  'map',
  'check',
  'circle',
  'circle-check-big',
  'chevron-down',
  'chevron-up',
  'chevron-right',
  'arrow-right',
  'arrow-left',
  'arrow-up-right',
  'sparkles',
  'layers',
  'clock',
  'users',
  'cpu',
  'target',
  'route',
  'combine',
  'briefcase',
  'handshake',
  'book-open',
  'building-2',
  'network',
  'graduation-cap',
  'compass',
  'dot',
  'phone',
  'mail',
  'message-square',
  'send',
  'file-text',
  'qr-code',
  'lightbulb',
  'thermometer',
  'wifi',
  'camera',
  'speaker',
  'rocket',
  'package',
  'hand-helping',
  'triangle-alert',
  'info',
  'quote',
] as const;

/** 裸图标名，如 `graduation-cap`。 */
export type LucideName = (typeof LUCIDE_ICONS)[number];

/** astro-icon 在模板里使用的全名，如 `lucide:graduation-cap`。 */
export type IconName = `lucide:${LucideName}`;
