import { normalizeBluetoothPayload } from './bluetoothAdapter.js';

export async function loadMockData() {
  const [samples, hourPlans, events, manualRecords] = await Promise.all([
    fetchJson('./src/data/mock/realtime-samples.json'),
    fetchJson('./src/data/mock/daily-emotion-plan.json'),
    fetchJson('./src/data/mock/events.json'),
    fetchJson('./src/data/mock/manual-records.json'),
  ]);

  return {
    realtimeSamples: samples.map(normalizeBluetoothPayload),
    hourPlans,
    events,
    manualRecords,
  };
}

export function startMockRealtimeFeed({ samples, onMessage, intervalMs = 5000 }) {
  let index = 0;

  if (!samples.length) {
    return () => {};
  }

  onMessage(samples[index]);
  index += 1;

  const timer = window.setInterval(() => {
    onMessage(samples[index % samples.length]);
    index += 1;
  }, intervalMs);

  return () => window.clearInterval(timer);
}

async function fetchJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json();
}
