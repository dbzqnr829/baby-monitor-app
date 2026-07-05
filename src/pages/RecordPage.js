import { MANUAL_RECORD_LABELS } from '../domain/types.js';
import { formatDateTime } from '../services/formatters.js';

const RECORD_TYPES = ['feeding', 'sleeping', 'crying'];

export function RecordPage(state) {
  const activeType = state.activeRecordType;
  const activeRecords = state.manualRecords.filter((record) => record.type === activeType);

  return `
    <section class="page page--records">
      <div class="record-tabs">
        ${RECORD_TYPES.map(
          (type) => `
            <button class="record-tab ${activeType === type ? 'is-active' : ''}" data-action="select-record-type" data-record-type="${type}">
              <span>${MANUAL_RECORD_LABELS[type]}</span>
              <strong>${state.manualRecords.filter((record) => record.type === type).length}</strong>
            </button>
          `,
        ).join('')}
      </div>

      <section class="record-workspace">
        <form class="record-form" data-action="manual-record-form">
          <h2>添加${MANUAL_RECORD_LABELS[activeType]}小脚印</h2>
          <input type="hidden" name="type" value="${activeType}" />
          <label>
            标题
            <input name="title" required value="${MANUAL_RECORD_LABELS[activeType]}" />
          </label>
          <label>
            备注
            <textarea name="note" rows="4" placeholder="例如：配方奶、午睡、换尿布后缓解"></textarea>
          </label>
          <div class="form-grid">
            <label>
              奶量 ml
              <input name="amountMl" type="number" min="0" placeholder="可选" />
            </label>
            <label>
              时长 分钟
              <input name="durationMinutes" type="number" min="0" placeholder="可选" />
            </label>
          </div>
          <button class="button button--primary" type="submit">做个记号 🚀</button>
        </form>

        <section class="panel record-list-panel">
          <div class="panel__title-row">
            <div>
              <h2>今日${MANUAL_RECORD_LABELS[activeType]}历史</h2>
            </div>
          </div>
          ${
            activeRecords.length
              ? `<div class="manual-list">
                  ${activeRecords
                    .map(
                      (record) => `
                        <article class="manual-card">
                          <time>${formatDateTime(record.timestamp)}</time>
                          <h3>${record.title}</h3>
                          <p>${record.note || '未填写备注'}</p>
                          <span>${record.amountMl ? `${record.amountMl} ml` : ''}${record.amountMl && record.durationMinutes ? ' · ' : ''}${record.durationMinutes ? `${record.durationMinutes} 分钟` : ''}</span>
                        </article>
                      `,
                    )
                    .join('')}
                </div>`
              : '<div class="empty-state">暂无记录</div>'
          }
        </section>
      </section>
    </section>
  `;
}
