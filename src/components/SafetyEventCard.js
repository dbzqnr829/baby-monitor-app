import { ConfirmButton } from './ConfirmButton.js';
import { formatDateTime } from '../services/formatters.js';

export function SafetyEventCard(event) {
  return `
    <article class="safety-card ${event.status === 'confirmed' ? 'is-confirmed' : ''}">
      ${event.imageUrl ? `<img class="safety-card__image" src="${event.imageUrl}" alt="${event.title}" loading="lazy" />` : ''}
      <div class="safety-card__content">
        <div class="safety-card__header">
          <span class="status-pill status-pill--${event.status}">${event.status === 'pending' ? '待确认' : '已确认'}</span>
          <time>${formatDateTime(event.timestamp)}</time>
        </div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
      </div>
      <div class="safety-card__action">${ConfirmButton(event)}</div>
    </article>
  `;
}
