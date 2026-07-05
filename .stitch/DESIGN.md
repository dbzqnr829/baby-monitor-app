---
name: Baby Comfort Monitor
colors:
  background: '#f6f7f9'
  surface: '#ffffff'
  surface-muted: '#eef2f5'
  text: '#1d2733'
  text-muted: '#657281'
  line: '#d9e0e7'
  happy: '#e6a23c'
  happy-soft: '#fff3d8'
  calm: '#4f8fbd'
  calm-soft: '#e6f2fb'
  crying: '#d95f59'
  crying-soft: '#fde8e5'
  safety: '#b85262'
  safety-soft: '#fae6ea'
  feeding: '#4a8b68'
  feeding-soft: '#e5f3ec'
  sleeping: '#6975b9'
  sleeping-soft: '#e9ebfa'
  pending: '#9b6a2f'
  pending-soft: '#f5ebdc'
typography:
  app-title:
    fontFamily: Inter, Microsoft YaHei, system-ui, sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: '0'
  section-title:
    fontFamily: Inter, Microsoft YaHei, system-ui, sans-serif
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: '0'
  stat-xl:
    fontFamily: Inter, Microsoft YaHei, system-ui, sans-serif
    fontSize: 50px
    fontWeight: '900'
    lineHeight: 50px
    letterSpacing: '0'
  stat-md:
    fontFamily: Inter, Microsoft YaHei, system-ui, sans-serif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 31px
    letterSpacing: '0'
  body:
    fontFamily: Inter, Microsoft YaHei, system-ui, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  label:
    fontFamily: Inter, Microsoft YaHei, system-ui, sans-serif
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: '0'
rounded:
  sm: 6px
  md: 8px
  pill: 999px
spacing:
  unit: 4px
  xs: 6px
  sm: 10px
  md: 14px
  lg: 18px
  xl: 24px
  page-x-mobile: 10px
  page-x-desktop: 16px
---

# Design System: Baby Comfort Monitor

## 1. Visual Theme & Atmosphere

This interface is a quiet, data-led family monitoring tool. It should feel calm, trustworthy, and easy to scan at a glance, with soft clinical neutrals and gentle emotional color cues rather than playful decoration. The product language is intentionally restrained: the app avoids medical diagnosis framing and uses "comfort state index" style language to keep the experience informational, not alarming.

The visual density is moderate. On mobile, cards are compact and arranged for quick checking, especially the daily metric grid and safety summaries. Surfaces are white or softly tinted, separated by thin borders and a broad but low-opacity shadow, creating clear hierarchy without a heavy dashboard feel.

## 2. Color Palette & Roles

### Primary Foundation

- **Cloud Background** `#f6f7f9`: app canvas and page background.
- **Clean White Surface** `#ffffff`: cards, panels, forms, event containers.
- **Muted Surface** `#eef2f5`: disabled states, subtle chips, and secondary fills.
- **Hairline Border** `#d9e0e7`: card borders, chart axes, input outlines.

### Accent & Interactive

- **Ink Action** `#1d2733`: active navigation and primary confirmation buttons.
- **Calm Blue** `#4f8fbd`: line chart stroke, calm state, pie chart segment.
- **Warm Happy Amber** `#e6a23c`: happy state, highlight accents, selected chart points.
- **Soft Red Crying** `#d95f59`: crying state and crying event accents.
- **Safety Rose** `#b85262`: safety event accents and safety metric tone.

### Typography & Text Hierarchy

- **Primary Text** `#1d2733`: headings, values, primary labels.
- **Muted Text** `#657281`: metadata, timestamps, explanatory body text.
- **White Text** `#ffffff`: active nav and primary button text.

### Functional States

- **Feeding Green Soft** `#e5f3ec` with `#4a8b68`: feeding metric cards.
- **Sleeping Lavender Soft** `#e9ebfa` with `#6975b9`: sleep metric cards.
- **Pending Ochre Soft** `#f5ebdc` with `#9b6a2f`: pending or mixed states.
- **Confirmed Gray** `#f1f3f5`: confirmed event rows and subdued completed states.

## 3. Typography Rules

### Hierarchy & Weights

The typography stack is system-first with Inter intent and Microsoft YaHei support for Chinese content. It should remain utilitarian, readable, and compact. Large numeric values carry the interface: daily score uses a 50px heavy stat style, metric cards use a 28px stat style, and chart donut values use a 30px center value.

Headings are strong but not oversized. Page and panel headings sit around 24px to 28px, while metadata uses small, bold, all-caps or compact labels. Letter spacing stays at `0`; the interface should not feel editorial or brand-heavy.

### Spacing Principles

Text blocks are short and scanned vertically. Body copy uses a relaxed line height around 1.55 to 1.65, while compact cards keep values close to labels with 8px to 10px vertical rhythm. Avoid adding long explanatory helper text inside cards; the current direction favors clean labels plus data.

## 4. Component Stylings

### Buttons

Buttons are rectangular with an 8px radius and a minimum height of 40px. Primary actions use the Ink Action fill with white text. Confirmed or disabled buttons use the muted surface fill and muted text. Buttons should feel clear and operational, not decorative.

### Metric Cards

Metric cards are compact dashboard tiles with 8px radius, 1px border, and a soft shadow. They use tinted backgrounds to communicate category: feeding green, crying red, sleeping lavender, safety rose. On narrow mobile screens, the daily metric grid remains two columns so the four key metrics form a 2x2 block.

### Panels & Event Cards

Panels are white surfaces with a border and soft shadow. Event cards are small, scrollable list items with category-colored left borders. Safety cards can include a thumbnail, status pill, timestamp, title, description, and confirmation action. Confirmed rows reduce opacity and switch to a neutral gray background.

### Navigation

Navigation is a five-item segmented grid. The container is white with a thin border, 8px radius, and soft elevation. Active navigation uses Ink Action fill and white text. On mobile, the nav remains five columns with compact 13px button text.

### Inputs & Forms

Forms use stacked labels, 8px radius inputs, 1px borders, and 12px internal padding. Labels are bold and muted. The record workspace uses a two-column layout on desktop, collapsing into one column below 860px.

### Charts & Emotion Composition

The trend chart is an inline SVG with a calm blue stroke and selected amber point. The emotion composition uses a donut chart with happy amber, calm blue, and crying red segments. The donut has a white inner circle and a bold center score, paired with a compact legend.

## 5. Layout Principles

### Grid & Structure

The app shell is capped at 1180px and uses `calc(100% - 32px)` on desktop. The main content is a single-column page stack with 18px gaps. The Today hero uses a two-column grid on desktop, with video preview larger than the state panel.

### Whitespace Strategy

Spacing is based on a small 4px rhythm, with most component gaps landing at 10px, 14px, 18px, or 24px. Cards use 14px to 20px padding depending on density. Page padding is intentionally modest so mobile screens prioritize content.

### Alignment & Visual Balance

Most text is left aligned. Numeric values are prominent and placed near the top of their cards. Visual weight comes from category tints, large numbers, and list density rather than decorative imagery.

### Responsive Behavior & Touch

At `max-width: 860px`, major two-column layouts collapse to one column, while metric summaries retain two columns. At `max-width: 560px`, the daily metric grid remains 2x2, record tabs remain three columns, and forms collapse to one column. Touch targets are at least 40px high for nav and buttons.

## 6. Design System Notes for Stitch Generation

### Language to Use

Use prompts such as "calm family monitoring dashboard", "soft clinical mobile UI", "compact baby comfort metrics", "category-tinted cards", and "quiet safety event center". Avoid marketing hero language or playful baby-themed illustration unless explicitly requested.

### Color References

Use Cloud Background for page canvas, Clean White Surface for panels, Ink Action for active controls, Calm Blue for charts, Warm Happy Amber for positive moments, Soft Red Crying for crying, Safety Rose for risk and safety, and category soft fills for metric cards.

### Component Prompts

- Create a mobile dashboard with a top segmented nav, a calm state panel, and four 2x2 category-tinted metric cards.
- Create a trend panel with a blue line chart and a donut chart for emotion composition using amber, blue, and red segments.
- Create a safety event center with two summary cards, scrollable event cards, status pills, thumbnails, and confirmation buttons.

### Incremental Iteration

When iterating in Stitch, preserve the 8px radius, thin borders, and restrained shadows. Keep labels concise and avoid adding explanatory paragraphs inside cards. Use charts and state colors to communicate meaning instead of long text.
