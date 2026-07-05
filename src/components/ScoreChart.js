export function ScoreChart({ hourlyScores, selectedHour }) {
  const width = 720;
  const height = 260;
  const padding = 36;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const points = hourlyScores.map((item, index) => {
    const x = padding + (chartWidth / 23) * index;
    const score = item.score ?? 0;
    const y = padding + chartHeight - (score / 100) * chartHeight;
    return { ...item, x, y };
  });

  const path = points
    .filter((point) => point.score !== null)
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return `
    <div class="chart-shell" data-preserve-scroll="score-chart">
      <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="24小时舒适状态指数折线图">
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="chart-axis"></line>
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="chart-axis"></line>
        <path d="${path}" class="score-line"></path>
        ${points
          .map(
            (point) => `
              <g class="score-point ${point.hour === selectedHour ? 'is-selected' : ''}" data-action="select-hour" data-hour="${point.hour}">
                <circle data-action="select-hour" data-hour="${point.hour}" cx="${point.x}" cy="${point.y}" r="${point.hour === selectedHour ? 8 : 5}"></circle>
                <text data-action="select-hour" data-hour="${point.hour}" x="${point.x}" y="${height - 12}">${point.hour}</text>
              </g>
            `,
          )
          .join('')}
      </svg>
    </div>
  `;
}
