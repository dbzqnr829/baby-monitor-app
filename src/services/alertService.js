/**
 * V1 intentionally does not send alerts. Keep this adapter in the event flow so
 * phone push, device sound, SMS, or other channels can be added later without
 * rewriting pages or safety-event storage.
 */
export function notifySafetyEvent(payload) {
  return {
    delivered: false,
    reason: 'alerts-disabled-in-v1',
    payload,
  };
}
