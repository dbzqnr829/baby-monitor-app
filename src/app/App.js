import { Navigation } from './navigation.js';
import { TodayPage } from '../pages/TodayPage.js?v=20260705-pie';
import { TrendPage } from '../pages/TrendPage.js?v=20260705-pie';
import { RecordPage } from '../pages/RecordPage.js?v=20260705-pie';
import { HighlightsPage } from '../pages/HighlightsPage.js?v=20260705-pie';
import { SafetyPage } from '../pages/SafetyPage.js?v=20260705-pie';
import { store } from '../store/babyMonitorStore.js';
import { loadMockData, startMockRealtimeFeed } from '../services/dataFeed.js';

const app = document.querySelector('#app');
const pages = {
  today: TodayPage,
  trend: TrendPage,
  records: RecordPage,
  highlights: HighlightsPage,
  safety: SafetyPage,
};

let activePage = 'today';
let currentState = store.getState();

store.subscribe((nextState) => {
  currentState = nextState;
  render();
});

renderShell('数据加载中...');

loadMockData()
  .then((mockData) => {
    store.initialize(mockData);
    startMockRealtimeFeed({
      samples: mockData.realtimeSamples,
      onMessage: (payload) => store.ingestBluetoothPayload(payload),
      intervalMs: 5000,
    });
  })
  .catch((error) => {
    renderShell(`加载 mock 数据失败：${error.message}`);
  });

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;

  if (action === 'navigate') {
    activePage = target.dataset.page;
    render();
  }

  if (action === 'confirm-event') {
    store.confirmSafetyEvent(target.dataset.eventId);
  }

  if (action === 'select-hour') {
    store.setSelectedHour(Number(target.dataset.hour));
  }

  if (action === 'select-record-type') {
    store.setActiveRecordType(target.dataset.recordType);
  }
});

app.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-action="manual-record-form"]');
  if (!form) return;

  event.preventDefault();
  const data = new FormData(form);

  store.addManualRecord({
    type: data.get('type'),
    title: data.get('title') || '记录',
    note: data.get('note') || '',
    amountMl: Number(data.get('amountMl')) || undefined,
    durationMinutes: Number(data.get('durationMinutes')) || undefined,
  });

  form.reset();
});

function render() {
  if (!currentState.loaded) {
    renderShell('数据加载中...');
    return;
  }

  const Page = pages[activePage] || TodayPage;
  app.innerHTML = `
    <div class="app-shell">
      <header class="app-header">
        <div>
          <span class="eyebrow">Baby Monitor Prototype</span>
          <h1>婴儿舒适状态监测</h1>
        </div>
        ${Navigation(activePage)}
      </header>
      <main>${Page(currentState)}</main>
    </div>
  `;
}

function renderShell(message) {
  app.innerHTML = `
    <div class="app-shell">
      <div class="loading-panel">${message}</div>
    </div>
  `;
}
