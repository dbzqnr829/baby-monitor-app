import { ConfirmButton } from './ConfirmButton.js';
import { formatDateTime } from '../services/formatters.js';

export function SafetyEventCard(event) {
  const statusLabel = event.status === 'pending' ? '待确认' : '已确认';
  const thumbnail = event.imageUrl
    ? `<img class="safety-card__image" src="${event.imageUrl}" alt="${event.title}" loading="lazy" />`
    : `<div class="safety-card__image safety-card__image--placeholder" aria-hidden="true">📷</div>`;

  return `
    <article class="safety-card ${event.status === 'confirmed' ? 'is-confirmed' : ''}">
      ${thumbnail}
      <div class="safety-card__content">
        <div class="safety-card__header">
          <span class="status-pill status-pill--${event.status}">${statusLabel}</span>
          <time>${formatDateTime(event.timestamp)}</time>
        </div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
      </div>
      <div class="safety-card__action">${ConfirmButton(event)}</div>
    </article>
  `;
}
