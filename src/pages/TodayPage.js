import { MetricCard } from '../components/MetricCard.js?v=20260705-pie';
import { EventList } from '../components/EventList.js';
import { formatDuration } from '../services/formatters.js';
import { getCurrentStateDescription } from '../domain/scoreCalculator.js?v=20260705-pie';
import { EMOTION_LABELS } from '../domain/types.js';

export function TodayPage(state) {
  const currentHour = state.hourlyScores[state.selectedHour] || state.hourlyScores[0];
  const currentEmotion = state.latestPayload?.emotion || 'calm';
  const scoreText = state.dailyScore?.score === null ? '数据不足' : `${state.dailyScore.score} 分`;
  const sleepDuration = formatDuration(state.metrics.sleepingMinutes)
    .replace(' 小时 ', 'h ')
    .replace(' 分钟', 'm');

  return `
    <section class="page page--today">
      <div class="today-hero">
        <section class="state-panel state-panel--${state.dailyScore?.band.tone || 'calm'}">
          <div class="state-panel__copy">
            <h1>${state.dailyScore?.band.label || '数据同步中'} ✨</h1>
            <p>${getCurrentStateDescription(currentHour)}</p>
          </div>
          <div class="state-panel__score">
            <strong>${scoreText}</strong>
            <span>舒适指数</span>
          </div>
        </section>
        <section class="video-panel">
          <div class="video-panel__surface">
            <div class="video-panel__lens"></div>
            <span class="video-panel__tag">🔴 实时监控画面</span>
          </div>
        </section>
      </div>

      <section class="metric-grid" aria-label="今日概览">
        ${MetricCard({ label: '🍼 今日进食', value: `${state.metrics.feedingCount} 次`, detail: '妈妈刚刚更新过', tone: 'feeding' })}
        ${MetricCard({ label: '😢 哭闹次数', value: `${state.metrics.cryingCount} 次`, detail: '留意宝宝情绪哦', tone: 'crying' })}
        ${MetricCard({ label: '💤 睡眠时间', value: sleepDuration, detail: '宝宝睡得很香', tone: 'sleeping' })}
        ${MetricCard({ label: '🚨 安全防护', value: `${state.metrics.safetyCount} 次`, detail: `${state.safetyStats.pending} 个待确认`, tone: 'safety' })}
      </section>

      <section class="panel">
        <div class="panel__title-row">
          <div>
            <h2>最近小事件</h2>
          </div>
        </div>
        ${EventList({ events: state.recentEvents })}
      </section>
    </section>
  `;
}
