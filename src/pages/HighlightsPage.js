import { HighlightGrid } from '../components/HighlightGrid.js';

export function HighlightsPage(state) {
  return `
    <section class="page page--highlights">
      <section class="panel panel--plain">
        <div class="panel__title-row">
          <div>
            <h1>开心高光时刻</h1>
          </div>
        </div>
        ${HighlightGrid({ highlights: state.highlights })}
      </section>
    </section>
  `;
}
