import assert from 'node:assert/strict';
import {
  aggregateFiveMinuteWindow,
  buildHourlyScores,
  calculateDailyScore,
} from '../src/domain/scoreCalculator.js';
import { confirmEvent, getSafetyStats } from '../src/domain/eventRules.js';

const fullWindow = [
  ...Array.from({ length: 35 }, (_, index) => ({
    id: `calm-${index}`,
    emotion: 'calm',
    valid: true,
  })),
  ...Array.from({ length: 15 }, (_, index) => ({
    id: `happy-${index}`,
    emotion: 'happy',
    valid: true,
  })),
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `crying-${index}`,
    emotion: 'crying',
    valid: true,
  })),
];

const aggregated = aggregateFiveMinuteWindow(fullWindow);
assert.equal(aggregated.valid, true);
assert.equal(aggregated.mainEmotion, 'calm');
assert.equal(aggregated.coverage, 100);

const insufficient = aggregateFiveMinuteWindow(fullWindow.slice(0, 20));
assert.equal(insufficient.valid, false);

const hourlyScores = buildHourlyScores([
  {
    hour: 8,
    windows: ['happy', 'happy', 'happy', 'calm', 'calm', 'calm', 'calm', 'calm', 'calm', 'crying', 'crying', 'crying'],
  },
  {
    hour: 9,
    windows: ['happy', 'missing', 'missing', 'missing', 'missing', 'missing', 'missing', 'missing', 'missing', 'missing', 'missing', 'missing'],
  },
]);

assert.equal(hourlyScores[0].score, 63);
assert.equal(hourlyScores[0].coverage, 100);
assert.equal(hourlyScores[1].score, null);
assert.equal(hourlyScores[1].band.label, '数据不足');

const daily = calculateDailyScore(hourlyScores);
assert.equal(daily.score, 63);

const safetyEvents = [
  { id: 'a', category: 'safety', status: 'pending' },
  { id: 'b', category: 'safety', status: 'confirmed' },
  { id: 'c', category: 'crying' },
];

assert.deepEqual(getSafetyStats(safetyEvents), { total: 2, pending: 1 });
assert.equal(confirmEvent(safetyEvents, 'a')[0].status, 'confirmed');

console.log('scoreCalculator tests passed');
