export function MetricCard({ label, value, detail, tone = 'neutral' }) {
  return `
    <article class="metric-card metric-card--${tone}">
      <span class="metric-card__label">${label}</span>
      <strong class="metric-card__value">${value}</strong>
      <span class="metric-card__detail">${detail}</span>
    </article>
  `;
}
