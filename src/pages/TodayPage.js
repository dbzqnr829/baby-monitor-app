import { MetricCard } from '../components/MetricCard.js';
import { EventList } from '../components/EventList.js';
import { formatDuration } from '../services/formatters.js';
import { getCurrentStateDescription } from '../domain/scoreCalculator.js';
import { EMOTION_LABELS } from '../domain/types.js';

export function TodayPage(state) {
  const currentHour = state.hourlyScores[state.selectedHour] || state.hourlyScores[0];
  const currentEmotion = state.latestPayload?.emotion || 'calm';
  const scoreText = state.dailyScore?.score === null ? '数据不足' : `${state.dailyScore.score} 分`;

  return `
    <section class="page page--today">
      <div class="today-hero">
        <section class="video-panel">
          <div class="video-panel__surface">
            <div class="video-panel__lens"></div>
            <span>实时监控画面</span>
          </div>
        </section>
        <section class="state-panel state-panel--${state.dailyScore?.band.tone || 'calm'}">
          <span class="eyebrow">今日舒适状态指数</span>
          <strong>${scoreText}</strong>
          <h1>${state.dailyScore?.band.label || '数据同步中'}</h1>
          <p>${getCurrentStateDescription(currentHour)}</p>
          <div class="state-panel__meta">
            <span>当前状态：${EMOTION_LABELS[currentEmotion]}</span>
            <span>有效记录：${formatDuration(state.dailyScore?.validMinutes || 0)}</span>
          </div>
        </section>
      </div>

      <section class="metric-grid" aria-label="今日概览">
        ${MetricCard({ label: '今日进食次数', value: state.metrics.feedingCount, detail: '手动记录', tone: 'feeding' })}
        ${MetricCard({ label: '哭闹次数', value: state.metrics.cryingCount, detail: '含独立哭闹事件', tone: 'crying' })}
        ${MetricCard({ label: '睡眠时间', value: formatDuration(state.metrics.sleepingMinutes), detail: '手动记录', tone: 'sleeping' })}
        ${MetricCard({ label: '安全事件次数', value: state.metrics.safetyCount, detail: `${state.safetyStats.pending} 个待确认`, tone: 'safety' })}
      </section>

      <section class="panel">
        <div class="panel__title-row">
          <div>
            <h2>最近事件</h2>
            <p>高光时刻、安全事件和哭闹按时间倒序排列。</p>
          </div>
        </div>
        ${EventList({ events: state.recentEvents })}
      </section>
    </section>
  `;
}
