export function getSafetyStats(events) {
  const safetyEvents = events.filter((event) => event.category === 'safety');
  const pendingEvents = safetyEvents.filter((event) => event.status === 'pending');

  return {
    total: safetyEvents.length,
    pending: pendingEvents.length,
  };
}

export function confirmEvent(events, eventId) {
  return events.map((event) => {
    if (event.id !== eventId || event.category !== 'safety') {
      return event;
    }

    return {
      ...event,
      status: 'confirmed',
    };
  });
}

export function getTodayMetricSummary({ manualRecords, events }) {
  return {
    feedingCount: manualRecords.filter((record) => record.type === 'feeding').length,
    cryingCount:
      manualRecords.filter((record) => record.type === 'crying').length +
      events.filter((event) => event.category === 'crying').length,
    sleepingMinutes: manualRecords
      .filter((record) => record.type === 'sleeping')
      .reduce((sum, record) => sum + (record.durationMinutes || 0), 0),
    safetyCount: events.filter((event) => event.category === 'safety').length,
  };
}
