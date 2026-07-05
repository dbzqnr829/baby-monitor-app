import { ConfirmButton } from './ConfirmButton.js';
import { formatTime } from '../services/formatters.js';

const CATEGORY_LABELS = {
  safety: '安全事件',
  crying: '哭闹',
  highlight: '高光时刻',
};

export function EventList({ events, emptyText = '暂无事件记录' }) {
  if (!events.length) {
    return `<div class="empty-state">${emptyText}</div>`;
  }

  return `
    <div class="event-list" role="list">
      ${events
        .map(
          (event) => `
            <article class="event-card event-card--${event.category} ${
              event.status === 'confirmed' ? 'is-confirmed' : ''
            }" role="listitem">
              <div class="event-card__main">
                <div class="event-card__meta">
                  <span class="event-card__tag">${CATEGORY_LABELS[event.category]}</span>
                  <time>${formatTime(event.timestamp)}</time>
                </div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
              </div>
              ${event.category === 'safety' ? `<div class="event-card__action">${ConfirmButton(event)}</div>` : ''}
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}
