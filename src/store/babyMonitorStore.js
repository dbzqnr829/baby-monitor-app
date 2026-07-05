import { buildHourlyScores, calculateDailyScore } from '../domain/scoreCalculator.js';
import { confirmEvent, getSafetyStats, getTodayMetricSummary } from '../domain/eventRules.js';
import { SAFETY_TYPE_LABELS } from '../domain/types.js';
import { notifySafetyEvent } from '../services/alertService.js';

const listeners = new Set();

const state = {
  loaded: false,
  realtimeSamples: [],
  latestPayload: null,
  hourPlans: [],
  hourlyScores: [],
  dailyScore: null,
  events: [],
  manualRecords: [],
  selectedHour: 14,
  activeRecordType: 'feeding',
};

export const store = {
  getState() {
    return {
      ...state,
      safetyStats: getSafetyStats(state.events),
      metrics: getTodayMetricSummary({
        manualRecords: state.manualRecords,
        events: state.events,
      }),
      highlights: state.events.filter((event) => event.category === 'highlight'),
      safetyEvents: state.events.filter((event) => event.category === 'safety'),
      recentEvents: [...state.events].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    };
  },

  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  initialize({ realtimeSamples, hourPlans, events, manualRecords }) {
    state.realtimeSamples = realtimeSamples;
    state.hourPlans = hourPlans;
    state.hourlyScores = buildHourlyScores(hourPlans);
    state.dailyScore = calculateDailyScore(state.hourlyScores);
    state.events = [...events].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    state.manualRecords = [...manualRecords].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    );
    state.latestPayload = realtimeSamples[0] || null;
    state.loaded = true;
    emit();
  },

  ingestBluetoothPayload(payload) {
    state.latestPayload = payload;
    state.realtimeSamples = [payload, ...state.realtimeSamples].slice(0, 60);

    if (payload.safety) {
      const event = {
        id: `evt-live-${payload.id}`,
        category: 'safety',
        safetyType: payload.safety.type,
        title: SAFETY_TYPE_LABELS[payload.safety.type],
        description: `实时数据检测到事件，持续 ${payload.safety.durationSeconds} 秒。`,
        timestamp: payload.timestamp,
        status: 'pending',
      };

      if (!state.events.some((existingEvent) => existingEvent.id === event.id)) {
        state.events = [event, ...state.events];
        notifySafetyEvent(event);
      }
    }

    if (payload.highlight?.captured) {
      const event = {
        id: `evt-live-highlight-${payload.id}`,
        category: 'highlight',
        title: '开心高光',
        description: '实时数据触发开心高光，已保存照片。',
        timestamp: payload.timestamp,
        imageUrl: payload.highlight.photoUrl,
      };

      if (!state.events.some((existingEvent) => existingEvent.id === event.id)) {
        state.events = [event, ...state.events];
      }
    }

    emit();
  },

  confirmSafetyEvent(eventId) {
    state.events = confirmEvent(state.events, eventId);
    emit();
  },

  setSelectedHour(hour) {
    state.selectedHour = hour;
    emit();
  },

  setActiveRecordType(type) {
    state.activeRecordType = type;
    emit();
  },

  addManualRecord(record) {
    state.manualRecords = [
      {
        id: `manual-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...record,
      },
      ...state.manualRecords,
    ];
    emit();
  },
};

function emit() {
  const nextState = store.getState();
  listeners.forEach((listener) => listener(nextState));
}
