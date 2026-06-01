import type { APIRoute } from 'astro';
import { levelMeta, levels, modules } from '../data/modules';
import { partnershipForms, scenarios } from '../data/partnerships';
import { tracks } from '../data/tracks';

export const prerender = true;

const FALLBACK_SITE = 'https://opc.chaihuo.org';

export const GET: APIRoute = (context) => {
  const base = (context.site?.toString() ?? FALLBACK_SITE).replace(/\/$/, '');
  const lines: string[] = [];

  lines.push('# 柴火创客学院（柴火创客 OPC 学院）');
  lines.push('');
  lines.push(
    '> 柴火创客学院是柴火创客生态（Seeed Studio + 柴火创客空间）旗下的技术赋能平台。' +
      '依托 Seeed 的全球硬件供应链与柴火创客空间（2011 年成立）的社区基底，' +
      '把生态中已被验证的技术能力转化为可学习、可交付、可复用的课程体系。' +
      '核心定位：培养学员掌握"新技术整合"能力，而不是提供解决方案。',
  );
  lines.push('');
  lines.push(
    '课程体系为 M0–M5 × L1/L2/L3 二维矩阵：六个模块（横轴，M0 为零基础旗舰入口，M1–M5 为五大行业方向）' +
      '× 三个掌握深度（纵轴：L1 展示层 / L2 顾问层 / L3 设计层），配三大课程方向（用 AI 造物 / 造 AI 的物 / 解决方案）。' +
      '销售矩阵为 3 类对象（高校/集成商/企业）× 4 种销售形态（A 裸硬件 / B 标准教学 / C 全托交付 / D 师资培训）。' +
      '合作意向通过 QR 码引导到外部登记页，本站不提供内嵌表单。',
  );
  lines.push('');
  lines.push(
    '本文件由 `src/data/*.ts` 自动生成，与官网页面同源。' +
      '课程内容会随技术发展持续迭代，**最终内容以官网对应页面为准**。',
  );
  lines.push('');

  lines.push('## 课程模块（M0–M5）');
  lines.push('');
  for (const m of modules) {
    lines.push(
      `- [${m.code} · ${m.title}](${base}/courses/${m.slug}): ${m.oneLiner}（难度 ${m.difficulty}，时长 ${m.duration}；技术栈 ${m.techStack.join(' / ')}；典型场景 ${m.scenarios.join(' / ')}）`,
    );
  }
  lines.push('');

  lines.push('## 学习深度（L1 / L2 / L3）');
  lines.push('');
  for (const lid of levels) {
    const meta = levelMeta[lid];
    lines.push(`- ${meta.label}: ${meta.description}`);
  }
  lines.push('');

  lines.push('## 三大课程方向（目标导向课程组合）');
  lines.push('');
  for (const t of tracks) {
    lines.push(`- [${t.name}](${base}/paths#track-${t.id}): ${t.goal} · 模块路径 ${t.tagline}`);
  }
  lines.push('');

  lines.push('## 合作对象（适合谁）');
  lines.push('');
  for (const s of scenarios) {
    lines.push(
      `- [${s.title}](${base}/contact#scenario-${s.id}): ${s.subtitle} · 可对应销售形态 ${s.applicableForms.join(' / ')}`,
    );
  }
  lines.push('');

  lines.push('## 销售形态（怎么交付）');
  lines.push('');
  for (const f of partnershipForms) {
    lines.push(`- [形态 ${f.code} · ${f.title}](${base}/contact#form-${f.code}): ${f.subtitle}`);
  }
  lines.push('');

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [学院首页](${base}/): 一句话定位与整体导航`);
  lines.push(`- [选课指南](${base}/paths): 按目标筛选学习路径`);
  lines.push(`- [课程总览](${base}/courses): M0–M5 × L1/L2/L3 完整矩阵`);
  lines.push(`- [关于学院](${base}/about): 生态背景与定位`);
  lines.push(`- [合作申请](${base}/contact): 通过 QR 码进入登记页`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
