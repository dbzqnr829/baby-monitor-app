export function ConfirmButton(event) {
  if (event.status === 'confirmed') {
    return `<button class="button button--confirmed" disabled>已确认</button>`;
  }

  return `<button class="button button--primary" data-action="confirm-event" data-event-id="${event.id}">确认</button>`;
}
