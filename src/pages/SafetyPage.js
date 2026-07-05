import { MetricCard } from '../components/MetricCard.js';
import { SafetyEventCard } from '../components/SafetyEventCard.js';

export function SafetyPage(state) {
  return `
    <section class="page page--safety">
      <section class="metric-grid metric-grid--two">
        ${MetricCard({ label: '安全事件次数', value: state.safetyStats.total, detail: '口鼻遮掩和呛咳', tone: 'safety' })}
        ${MetricCard({ label: '待确认事件个数', value: state.safetyStats.pending, detail: '确认后自动减少', tone: 'pending' })}
      </section>

      <section class="panel">
        <div class="panel__title-row">
          <div>
            <h1>安全事件中心</h1>
            <p>当前版本只保留待确认和已确认状态，暂不发送警报。</p>
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
