import { Navigation } from './navigation.js';
import { TodayPage } from '../pages/TodayPage.js?v=20260706-crying-tip';
import { TrendPage } from '../pages/TrendPage.js?v=20260706-scroll';
import { RecordPage } from '../pages/RecordPage.js?v=20260706-scroll';
import { HighlightsPage } from '../pages/HighlightsPage.js?v=20260706-scroll';
import { SafetyPage } from '../pages/SafetyPage.js?v=20260706-scroll';
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
let manualRecordDraft = null;
let isSubmittingManualRecord = false;
let hasDeferredRender = false;

store.subscribe((nextState) => {
  currentState = nextState;

  if (shouldDeferRenderForManualInput()) {
    hasDeferredRender = true;
    return;
  }

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
    const nextPage = target.dataset.page;
    if (nextPage !== activePage) {
      saveManualRecordDraft();
      activePage = nextPage;
      render({ animatePage: true, preserveScroll: false });
    }
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

  isSubmittingManualRecord = true;
  manualRecordDraft = null;
  store.addManualRecord({
    type: data.get('type'),
    title: data.get('title') || '记录',
    note: data.get('note') || '',
    amountMl: Number(data.get('amountMl')) || undefined,
    durationMinutes: Number(data.get('durationMinutes')) || undefined,
  });

  isSubmittingManualRecord = false;
  manualRecordDraft = null;
  form.reset();
});

app.addEventListener('focusout', (event) => {
  if (!event.target.closest('[data-action="manual-record-form"]')) return;

  setTimeout(() => {
    if (shouldDeferRenderForManualInput() || !hasDeferredRender) return;

    hasDeferredRender = false;
    render();
  }, 0);
});

function render({ animatePage = false, preserveScroll = true } = {}) {
  if (!currentState.loaded) {
    renderShell('数据加载中...');
    return;
  }

  const previousUiState = preserveScroll ? captureUiState() : null;
  const Page = pages[activePage] || TodayPage;
  app.innerHTML = `
    <div class="app-shell ${animatePage ? 'app-shell--page-transition' : ''}">
      <div class="system-bar">
        <span>14:00</span>
        <span>🍼 宝宝守护中...</span>
      </div>
      <header class="app-header">
        <div>
          <span class="eyebrow">Baby Monitor Prototype</span>
          <h1>宝宝舒适状态监测</h1>
        </div>
      </header>
      <main class="app-content">${Page(currentState)}</main>
      ${Navigation(activePage)}
    </div>
  `;

  if (preserveScroll) {
    restoreUiState(previousUiState);
  }
}

function renderShell(message) {
  app.innerHTML = `
    <div class="app-shell">
      <div class="system-bar">
        <span>14:00</span>
        <span>🍼 宝宝守护中...</span>
      </div>
      <div class="loading-panel">${message}</div>
    </div>
  `;
}

function captureUiState() {
  saveManualRecordDraft();

  const content = app.querySelector('.app-content');
  const keyedRegions = Array.from(app.querySelectorAll('[data-preserve-scroll]')).map((element) => [
    element.dataset.preserveScroll,
    {
      left: element.scrollLeft,
      top: element.scrollTop,
    },
  ]);

  return {
    manualRecordDraft,
    pageTop: content?.scrollTop ?? 0,
    regions: Object.fromEntries(keyedRegions),
  };
}

function restoreUiState(uiState) {
  if (!uiState) return;

  const apply = () => {
    const content = app.querySelector('.app-content');
    if (content) {
      content.scrollTop = uiState.pageTop;
    }

    Object.entries(uiState.regions).forEach(([key, position]) => {
      const element = app.querySelector(`[data-preserve-scroll="${key}"]`);
      if (!element) return;
      element.scrollLeft = position.left;
      element.scrollTop = position.top;
    });

    restoreManualRecordDraft(uiState.manualRecordDraft);
  };

  apply();
  requestAnimationFrame(() => {
    apply();
  });
}

function saveManualRecordDraft() {
  if (isSubmittingManualRecord) return;

  const form = app.querySelector('[data-action="manual-record-form"]');
  if (!form) return;

  const data = new FormData(form);
  manualRecordDraft = {
    type: data.get('type') || '',
    title: data.get('title') || '',
    note: data.get('note') || '',
    amountMl: data.get('amountMl') || '',
    durationMinutes: data.get('durationMinutes') || '',
  };
}

function restoreManualRecordDraft(draft) {
  const form = app.querySelector('[data-action="manual-record-form"]');
  if (!form || !draft) return;

  const typeInput = form.elements.namedItem('type');
  if (typeInput?.value !== draft.type) return;

  setFormValue(form, 'title', draft.title);
  setFormValue(form, 'note', draft.note);
  setFormValue(form, 'amountMl', draft.amountMl);
  setFormValue(form, 'durationMinutes', draft.durationMinutes);
}

function setFormValue(form, name, value) {
  const field = form.elements.namedItem(name);
  if (!field) return;
  field.value = value;
}

function shouldDeferRenderForManualInput() {
  if (isSubmittingManualRecord) return false;

  const activeElement = document.activeElement;
  return Boolean(activeElement?.closest?.('[data-action="manual-record-form"]'));
}
