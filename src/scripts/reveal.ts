/**
 * Scroll-reveal — 极克制的进场动效（淡入 + 微上移）。
 *
 * 用法：给元素加 `data-reveal`；需要错落时加内联 `style="--reveal-delay: 80ms"`。
 * 无依赖（不引 AOS）。尊重 `prefers-reduced-motion`：reduce 时立即显示、不动画。
 *
 * FOUC 保护：隐藏初始态仅在 `html.js-reveal` 下生效（见 theme.css），该类由
 * Layout.astro 的 inline head script 在首帧前同步加上；无 JS 时内容照常可见。
 *
 * ClientRouter 兼容：在 `astro:page-load` 内调用，每次导航重新观察新内容。
 */
export function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
  if (!els.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    els.forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  els.forEach((el) => {
    observer.observe(el);
  });
}
