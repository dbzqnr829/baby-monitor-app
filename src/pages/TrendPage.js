import { ScoreChart } from '../components/ScoreChart.js';
import { EmotionPieChart } from '../components/EmotionPieChart.js';

export function TrendPage(state) {
  const selectedScore = state.hourlyScores.find((hour) => hour.hour === state.selectedHour);

  return `
    <section class="page page--trend">
      <section class="panel">
        <div class="panel__title-row">
          <div>
            <h1>24 小时趋势</h1>
            <p>点击某个小时查看该小时的开心、平静与哭闹构成。</p>
          </div>
        </div>
        ${ScoreChart({ hourlyScores: state.hourlyScores, selectedHour: state.selectedHour })}
      </section>
      ${EmotionPieChart({ hourlyScore: selectedScore })}
    </section>
  `;
}
