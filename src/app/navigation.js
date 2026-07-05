export const NAV_ITEMS = [
  { id: 'today', label: '今日' },
  { id: 'trend', label: '趋势' },
  { id: 'records', label: '记录' },
  { id: 'highlights', label: '高光' },
  { id: 'safety', label: '安全' },
];

export function Navigation(activePage) {
  return `
    <nav class="app-nav" aria-label="主导航">
      ${NAV_ITEMS.map(
        (item) => `
          <button class="nav-item ${activePage === item.id ? 'is-active' : ''}" data-action="navigate" data-page="${item.id}">
            ${item.label}
          </button>
        `,
      ).join('')}
    </nav>
  `;
}
