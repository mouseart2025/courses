import type { APIRoute } from 'astro';
import { modules, levels, levelMeta, type Module } from '../data/modules';
import { tracks } from '../data/tracks';
import { scenarios, partnershipForms } from '../data/partnerships';

export const prerender = true;

const FALLBACK_SITE = 'https://opc.chaihuo.org';

const totalDays = (m: Module) =>
  Object.values(m.cells).reduce((sum, cell) => sum + cell.durationDays, 0);

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
    '课程体系为 M0–M5 × L1/L2/L3 二维矩阵：六个模块（横轴）× 三个学习深度（纵轴），' +
      '配六条目标导向的学习路径。合作矩阵为 3 类对象（高校/集成商/企业）× 4 种合作形式（授权/共建/内训/联合交付）。' +
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
      `- [${m.code} · ${m.title}](${base}/courses/${m.slug}): ${m.oneLiner}（合计约 ${totalDays(m)} 天，含 L1/L2/L3 三档深度）`,
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

  lines.push('## 学习路径（目标导向课程组合）');
  lines.push('');
  for (const t of tracks) {
    lines.push(
      `- [${t.name}](${base}/paths#track-${t.id}): ${t.goal} · 模块路径 ${t.tagline}`,
    );
  }
  lines.push('');

  lines.push('## 合作对象（适合谁）');
  lines.push('');
  for (const s of scenarios) {
    lines.push(
      `- [${s.title}](${base}/contact#scenario-${s.id}): ${s.subtitle} · 可对应合作形式 ${s.applicableForms.join(' / ')}`,
    );
  }
  lines.push('');

  lines.push('## 合作形式（怎么合作）');
  lines.push('');
  for (const f of partnershipForms) {
    lines.push(
      `- [形式 ${f.code} · ${f.title}](${base}/contact#form-${f.code}): ${f.subtitle}`,
    );
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
