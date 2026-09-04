import type { Module } from '../data/modules';
import type { PartnershipForm, Scenario } from '../data/partnerships';
import type {
  AboutEcosystemItem,
  AboutValueItem,
  FamiliarObject,
  FaqItem,
  FinalCta,
  OutcomeItem,
  StatItem,
} from '../data/site';
import type { Track } from '../data/tracks';
import { dt } from './data-translations';
import { deepTranslate } from './module-translations';
import type { Locale } from './types';
import { localizePath } from './types';

export function translateTrack(t: Track, locale: Locale): Track {
  return {
    ...t,
    name: dt(locale, `track.${t.id}.name`) || t.name,
    goal: dt(locale, `track.${t.id}.goal`) || t.goal,
    description: dt(locale, `track.${t.id}.desc`) || t.description,
  };
}

export function translateTracks(tracks: Track[], locale: Locale): Track[] {
  return tracks.map((t) => translateTrack(t, locale));
}

export function translateModule(m: Module, locale: Locale): Module {
  if (locale === 'zh-CN') return m;
  // 模块文案以 deep translation 字典为准（module-translations.ts 及 *-new 覆盖文件）。
  // 早期放在 data-translations.ts 里的 module.* 字段是旧学习体系残留，已不再作为来源。
  return deepTranslateObj(m, locale);
}

function deepTranslateObj<T>(obj: T, locale: Locale): T {
  if (typeof obj === 'string')
    return deepTranslate(obj as unknown as string, locale) as unknown as T;
  if (Array.isArray(obj)) return obj.map((item) => deepTranslateObj(item, locale)) as unknown as T;
  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = deepTranslateObj(value, locale);
    }
    return result as T;
  }
  return obj;
}

export function translateModules(modules: Module[], locale: Locale): Module[] {
  return modules.map((m) => translateModule(m, locale));
}

export function translateFamiliarObject(obj: FamiliarObject, locale: Locale): FamiliarObject {
  const key = obj.href.includes('m0')
    ? 'led'
    : obj.href.includes('m1')
      ? 'gateway'
      : obj.href.includes('m3')
        ? 'camera'
        : obj.href.includes('m4')
          ? 'speaker'
          : obj.href.includes('m5')
            ? 'docs'
            : 'sensor';
  return {
    ...obj,
    label: dt(locale, `object.${key}.label`) || obj.label,
    hint: dt(locale, `object.${key}.hint`) || obj.hint,
    moduleHint: dt(locale, `object.${key}.module`) || obj.moduleHint,
  };
}

export function translateFamiliarObjects(
  objects: FamiliarObject[],
  locale: Locale,
): FamiliarObject[] {
  return objects.map((o) => translateFamiliarObject(o, locale));
}

export function translateOutcome(o: OutcomeItem, locale: Locale, index: number): OutcomeItem {
  const keys = ['hardware', 'project', 'material', 'reuse'];
  const key = keys[index] ?? 'hardware';
  return {
    ...o,
    label: dt(locale, `outcome.${key}.label`) || o.label,
    description: dt(locale, `outcome.${key}.desc`) || o.description,
  };
}

export function translateOutcomes(outcomes: OutcomeItem[], locale: Locale): OutcomeItem[] {
  return outcomes.map((o, i) => translateOutcome(o, locale, i));
}

export function translateCta(cta: FinalCta, locale: Locale): FinalCta {
  const ctaKey =
    cta.title.includes('把学习体系引入') || cta.title.includes('Bring the course')
      ? 'home'
      : cta.title.includes('选好组合') || cta.title.includes('After selecting')
        ? 'paths'
        : cta.title.includes('把学习模块引入') || cta.title.includes('Bring learning modules')
          ? 'courses'
          : 'about';
  return {
    ...cta,
    title: dt(locale, `cta.${ctaKey}.title`) || cta.title,
    description: dt(locale, `cta.${ctaKey}.desc`) || cta.description,
    primary: {
      ...cta.primary,
      href: localizePath(locale, cta.primary.href),
      label:
        cta.primary.label.includes('申请合作') || cta.primary.label.includes('Apply for')
          ? dt(locale, 'cta.apply')
          : cta.primary.label.includes('查看课程') ||
              cta.primary.label.includes('查看学习体系') ||
              cta.primary.label.includes('View Course') ||
              cta.primary.label.includes('View Learning')
            ? dt(locale, 'cta.viewCourses')
            : cta.primary.label.includes('选课') ||
                cta.primary.label.includes('查看路径指南') ||
                cta.primary.label.includes('Learning Path')
              ? dt(locale, 'cta.viewPaths')
              : cta.primary.label.includes('了解学园') || cta.primary.label.includes('Learn About')
                ? dt(locale, 'cta.aboutOrg')
                : cta.primary.label,
    },
    secondary: cta.secondary
      ? {
          ...cta.secondary,
          href: localizePath(locale, cta.secondary.href),
          label:
            cta.secondary.label.includes('申请合作') || cta.secondary.label.includes('Apply for')
              ? dt(locale, 'cta.apply')
              : cta.secondary.label.includes('查看课程') ||
                  cta.secondary.label.includes('查看学习体系') ||
                  cta.secondary.label.includes('View Course') ||
                  cta.secondary.label.includes('View Learning')
                ? dt(locale, 'cta.viewCourses')
                : cta.secondary.label.includes('选课') ||
                    cta.secondary.label.includes('查看路径指南') ||
                    cta.secondary.label.includes('Learning Path')
                  ? dt(locale, 'cta.viewPaths')
                  : cta.secondary.label.includes('了解学园') ||
                      cta.secondary.label.includes('Learn About')
                    ? dt(locale, 'cta.aboutOrg')
                    : cta.secondary.label,
        }
      : undefined,
  };
}

export function translateEcosystem(item: AboutEcosystemItem, locale: Locale): AboutEcosystemItem {
  const key = item.name.includes('Seeed')
    ? 'seeed'
    : item.name.includes('柴火创客空间') || item.name.includes('Chaihuo Makerspace')
      ? 'chaihuo'
      : 'opc';
  return {
    ...item,
    name: dt(locale, `eco.${key}.name`) || item.name,
    role: dt(locale, `eco.${key}.role`) || item.role,
    description: dt(locale, `eco.${key}.desc`) || item.description,
    tag: dt(locale, `eco.${key}.tag`) || item.tag,
  };
}

export function translateEcosystems(
  items: AboutEcosystemItem[],
  locale: Locale,
): AboutEcosystemItem[] {
  return items.map((e) => translateEcosystem(e, locale));
}

export function translateValue(item: AboutValueItem, locale: Locale): AboutValueItem {
  const key =
    item.title.includes('真硬件') || item.title.includes('Real Hardware')
      ? 'realHardware'
      : item.title.includes('真场景') || item.title.includes('Real Scenario')
        ? 'realScenario'
        : 'realConnection';
  return {
    ...item,
    title: dt(locale, `value.${key}.title`) || item.title,
    description: dt(locale, `value.${key}.desc`) || item.description,
  };
}

export function translateValues(items: AboutValueItem[], locale: Locale): AboutValueItem[] {
  return items.map((v) => translateValue(v, locale));
}

export function translateStat(item: StatItem, locale: Locale): StatItem {
  const num = item.number.replace(/\+$/, '');
  const key = `stat.${num}.label`;
  return { ...item, label: dt(locale, key) || item.label };
}

export function translateStats(items: StatItem[], locale: Locale): StatItem[] {
  return items.map((s) => translateStat(s, locale));
}

export function translateFaq(item: FaqItem, locale: Locale, index: number): FaqItem {
  return {
    question: dt(locale, `faq.q${index + 1}.q`) || item.question,
    answer: dt(locale, `faq.q${index + 1}.a`) || item.answer,
  };
}

export function translateFaqs(items: FaqItem[], locale: Locale): FaqItem[] {
  return items.map((f, i) => translateFaq(f, locale, i));
}

export function translateScenario(s: Scenario, locale: Locale): Scenario {
  return {
    ...s,
    title: dt(locale, `scenario.${s.id}.title`) || s.title,
    subtitle: dt(locale, `scenario.${s.id}.subtitle`) || s.subtitle,
    features: s.features.map((_, i) => dt(locale, `scenario.${s.id}.f${i + 1}`) || s.features[i]),
    outcomes: s.outcomes.map((_, i) => dt(locale, `scenario.${s.id}.o${i + 1}`) || s.outcomes[i]),
  };
}

export function translateScenarios(scenarios: Scenario[], locale: Locale): Scenario[] {
  return scenarios.map((s) => translateScenario(s, locale));
}

export function translatePartnershipForm(f: PartnershipForm, locale: Locale): PartnershipForm {
  return {
    ...f,
    title: dt(locale, `form.${f.code}.title`) || f.title,
    subtitle: dt(locale, `form.${f.code}.subtitle`) || f.subtitle,
    features: f.features.map((_, i) => dt(locale, `form.${f.code}.f${i + 1}`) || f.features[i]),
    deliverables: f.deliverables.map(
      (_, i) => dt(locale, `form.${f.code}.d${i + 1}`) || f.deliverables[i],
    ),
  };
}

export function translatePartnershipForms(
  forms: PartnershipForm[],
  locale: Locale,
): PartnershipForm[] {
  return forms.map((f) => translatePartnershipForm(f, locale));
}
