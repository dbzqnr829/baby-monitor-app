import { formatDateTime } from '../services/formatters.js';

export function HighlightGrid({ highlights }) {
  if (!highlights.length) {
    return `<div class="empty-state">暂无开心高光</div>`;
  }

  return `
    <div class="highlight-grid">
      ${highlights
        .map(
          (item, index) => `
            <article class="highlight-card ${index % 3 === 1 ? 'highlight-card--tall' : ''}">
              <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
              <div class="highlight-card__body">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <time>${formatDateTime(item.timestamp)}</time>
              </div>
            </article>
          `,
        )
        .join('')}
    </div>
  `;
}
