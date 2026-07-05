export const NAV_ITEMS = [
  { id: 'today', label: '今日', icon: '☀️' },
  { id: 'trend', label: '趋势', icon: '📈' },
  { id: 'records', label: '记录', icon: '📝' },
  { id: 'highlights', label: '高光', icon: '🌈' },
  { id: 'safety', label: '安全', icon: '🛡️' },
];

export function Navigation(activePage) {
  return `
    <nav class="app-nav bottom-nav" aria-label="主导航">
      ${NAV_ITEMS.map(
        (item) => `
          <button class="nav-item ${activePage === item.id ? 'is-active' : ''}" data-action="navigate" data-page="${item.id}">
            <span class="nav-icon-wrapper">${item.icon}</span>
            <span>${item.label}</span>
          </button>
        `,
      ).join('')}
    </nav>
  `;
}
