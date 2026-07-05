import { MetricCard } from '../components/MetricCard.js';
import { SafetyEventCard } from '../components/SafetyEventCard.js';

export function SafetyPage(state) {
  return `
    <section class="page page--safety">
      <section class="metric-grid metric-grid--two">
        ${MetricCard({ label: '安全事件次数', value: state.safetyStats.total, detail: '口鼻遮挡与疑似呛咳', tone: 'safety' })}
        ${MetricCard({ label: '待确认事件', value: state.safetyStats.pending, detail: '家长确认后更新', tone: 'pending' })}
      </section>

      <section class="panel">
        <div class="panel__title-row">
          <div>
            <h1>安全事件中心</h1>
          </div>
        </div>
        <div class="safety-list">
          ${
            state.safetyEvents.length
              ? state.safetyEvents.map((event) => SafetyEventCard(event)).join('')
              : '<div class="empty-state">暂无安全事件</div>'
          }
        </div>
      </section>
    </section>
  `;
}
