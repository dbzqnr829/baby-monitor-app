import { HighlightGrid } from '../components/HighlightGrid.js';

export function HighlightsPage(state) {
  return `
    <section class="page page--highlights">
      <section class="panel panel--plain">
        <div class="panel__title-row">
          <div>
            <h1>开心高光时刻</h1>
            <p>自动留存值得回顾的开心照片，按时间倒序展示。</p>
          </div>
        </div>
        ${HighlightGrid({ highlights: state.highlights })}
      </section>
    </section>
  `;
}
