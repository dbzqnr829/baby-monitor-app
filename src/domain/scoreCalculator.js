import { EMOTION_LABELS } from './types.js';

export const EMOTION_BASE_SCORE = {
  happy: 100,
  calm: 75,
  crying: 0,
};

export const MIN_VALID_RESULTS_PER_WINDOW = 30;
export const MIN_HOURLY_COVERAGE = 50;
const WINDOW_MINUTES = 5;
const WINDOWS_PER_HOUR = 12;

export function getComfortBand(score, coverage) {
  if (coverage < MIN_HOURLY_COVERAGE || score === null) {
    return { label: '数据不足', tone: 'insufficient' };
  }

  if (score >= 85) return { label: '愉悦活跃', tone: 'happy' };
  if (score >= 65) return { label: '平稳舒适', tone: 'calm' };
  if (score >= 40) return { label: '状态有波动', tone: 'mixed' };
  return { label: '哭闹较多', tone: 'crying' };
}

export function aggregateFiveMinuteWindow(samples) {
  const validSamples = samples.filter((sample) => sample.valid);

  if (validSamples.length < MIN_VALID_RESULTS_PER_WINDOW) {
    return {
      valid: false,
      coverage: Math.round((validSamples.length / 60) * 100),
      mainEmotion: null,
      counts: { happy: 0, calm: 0, crying: 0 },
      validCount: validSamples.length,
    };
  }

  const counts = countEmotions(validSamples);
  const mainEmotion = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

  return {
    valid: true,
    coverage: Math.round((validSamples.length / 60) * 100),
    mainEmotion,
    counts,
    validCount: validSamples.length,
  };
}

export function buildHourlyScores(hourPlans) {
  return hourPlans.map((hour) => {
    const validWindows = hour.windows.filter((window) => window !== 'missing');
    const validWindowCount = validWindows.length;
    const coverage = Math.round((validWindowCount / WINDOWS_PER_HOUR) * 100);
    const composition = {
      happy: validWindows.filter((emotion) => emotion === 'happy').length,
      calm: validWindows.filter((emotion) => emotion === 'calm').length,
      crying: validWindows.filter((emotion) => emotion === 'crying').length,
      missing: WINDOWS_PER_HOUR - validWindowCount,
    };

    const score =
      coverage < MIN_HOURLY_COVERAGE || validWindowCount === 0
        ? null
        : Math.round(
            validWindows.reduce((sum, emotion) => sum + EMOTION_BASE_SCORE[emotion], 0) /
              validWindowCount,
          );

    return {
      hour: hour.hour,
      score,
      coverage,
      composition,
      validMinutes: validWindowCount * WINDOW_MINUTES,
      band: getComfortBand(score, coverage),
    };
  });
}

export function calculateDailyScore(hourlyScores) {
  const scoredHours = hourlyScores.filter((hour) => hour.score !== null && hour.validMinutes > 0);
  const totalValidMinutes = scoredHours.reduce((sum, hour) => sum + hour.validMinutes, 0);

  if (!totalValidMinutes) {
    return {
      score: null,
      validMinutes: 0,
      coverage: 0,
      band: getComfortBand(null, 0),
    };
  }

  const weightedScore = Math.round(
    scoredHours.reduce((sum, hour) => sum + hour.score * hour.validMinutes, 0) / totalValidMinutes,
  );

  const coverage = Math.round((totalValidMinutes / (24 * 60)) * 100);

  return {
    score: weightedScore,
    validMinutes: totalValidMinutes,
    coverage,
    band: getComfortBand(weightedScore, Math.max(coverage, MIN_HOURLY_COVERAGE)),
  };
}

export function getEmotionPercentages(composition) {
  const total = composition.happy + composition.calm + composition.crying;

  if (!total) {
    return { happy: 0, calm: 0, crying: 0 };
  }

  return {
    happy: Math.round((composition.happy / total) * 100),
    calm: Math.round((composition.calm / total) * 100),
    crying: Math.round((composition.crying / total) * 100),
  };
}

export function getCurrentStateDescription(hourlyScore) {
  if (!hourlyScore || hourlyScore.score === null) {
    return '当前有效数据不足，暂不生成舒适状态指数。';
  }

  const percentages = getEmotionPercentages(hourlyScore.composition);
  const leadingEmotion = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0][0];

  return `当前以${EMOTION_LABELS[leadingEmotion]}状态为主，数据覆盖率 ${hourlyScore.coverage}%。`;
}

function countEmotions(samples) {
  return samples.reduce(
    (counts, sample) => {
      counts[sample.emotion] += 1;
      return counts;
    },
    { happy: 0, calm: 0, crying: 0 },
  );
}
