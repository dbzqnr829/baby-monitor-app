import { getEmotionPercentages } from '../domain/scoreCalculator.js';

export function EmotionPieChart({ hourlyScore }) {
  if (!hourlyScore || hourlyScore.score === null) {
    return `
      <section class="panel">
        <h2>小时情绪构成</h2>
        <div class="empty-state">该小时数据不足</div>
      </section>
    `;
  }

  const percentages = getEmotionPercentages(hourlyScore.composition);

  return `
    <section class="panel">
      <div class="panel__title-row">
        <div>
          <h2>${String(hourlyScore.hour).padStart(2, '0')}:00 情绪小饼图</h2>
          <p>舒适状态指数 ${hourlyScore.score} 分</p>
        </div>
      </div>
      <div class="composition">
        <div class="donut" style="--happy-percent:${percentages.happy}; --calm-percent:${percentages.calm}; --crying-percent:${percentages.crying};">
          <span>${hourlyScore.score}</span>
        </div>
        <div class="composition__legend">
          <span><i class="legend-dot legend-dot--happy"></i>开心 ${percentages.happy}%</span>
          <span><i class="legend-dot legend-dot--calm"></i>平静 ${percentages.calm}%</span>
          <span><i class="legend-dot legend-dot--crying"></i>哭闹 ${percentages.crying}%</span>
        </div>
      </div>
    </section>
  `;
}
