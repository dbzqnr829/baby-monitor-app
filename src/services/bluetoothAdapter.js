const REQUIRED_FIELDS = ['id', 'timestamp', 'emotion', 'valid'];
const VALID_EMOTIONS = ['happy', 'calm', 'crying'];
const VALID_SAFETY_TYPES = ['choking', 'face_covered'];

export function normalizeBluetoothPayload(rawPayload) {
  const missingField = REQUIRED_FIELDS.find((field) => rawPayload[field] === undefined);

  if (missingField) {
    throw new Error(`Bluetooth payload missing field: ${missingField}`);
  }

  if (!VALID_EMOTIONS.includes(rawPayload.emotion)) {
    throw new Error(`Unsupported emotion: ${rawPayload.emotion}`);
  }

  if (rawPayload.safety && !VALID_SAFETY_TYPES.includes(rawPayload.safety.type)) {
    throw new Error(`Unsupported safety event type: ${rawPayload.safety.type}`);
  }

  return {
    id: String(rawPayload.id),
    timestamp: new Date(rawPayload.timestamp).toISOString(),
    emotion: rawPayload.emotion,
    valid: Boolean(rawPayload.valid),
    confidence: typeof rawPayload.confidence === 'number' ? rawPayload.confidence : undefined,
    safety: rawPayload.safety || undefined,
    highlight: rawPayload.highlight || undefined,
  };
}
