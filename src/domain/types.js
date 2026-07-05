/**
 * Shared domain shapes. They are documented with JSDoc so this static prototype
 * can stay dependency-free while remaining easy to migrate to TypeScript later.
 *
 * @typedef {'happy' | 'calm' | 'crying'} Emotion
 * @typedef {'feeding' | 'sleeping' | 'crying'} ManualRecordType
 * @typedef {'crying' | 'safety' | 'highlight'} EventCategory
 * @typedef {'choking' | 'face_covered'} SafetyEventType
 * @typedef {'pending' | 'confirmed'} SafetyEventStatus
 *
 * @typedef {Object} BluetoothPayload
 * @property {string} id
 * @property {string} timestamp
 * @property {Emotion} emotion
 * @property {boolean} valid
 * @property {number=} confidence Internal use only; never shown on family pages.
 * @property {{ type: SafetyEventType, durationSeconds: number }=} safety
 * @property {{ captured: boolean, photoUrl: string }=} highlight
 *
 * @typedef {Object} TimelineEvent
 * @property {string} id
 * @property {EventCategory} category
 * @property {string=} safetyType
 * @property {string} title
 * @property {string} description
 * @property {string} timestamp
 * @property {SafetyEventStatus=} status
 * @property {string=} imageUrl
 *
 * @typedef {Object} ManualRecord
 * @property {string} id
 * @property {ManualRecordType} type
 * @property {string} timestamp
 * @property {string} title
 * @property {string} note
 * @property {number=} amountMl
 * @property {number=} durationMinutes
 */

export const EMOTION_LABELS = {
  happy: '开心',
  calm: '平静',
  crying: '哭闹',
};

export const SAFETY_TYPE_LABELS = {
  choking: '疑似呛咳',
  face_covered: '口鼻遮挡',
};

export const MANUAL_RECORD_LABELS = {
  feeding: '进食',
  sleeping: '睡眠',
  crying: '哭闹',
};
