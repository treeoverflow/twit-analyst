class DateUtil {
  static isFutureTime(sourceMs, receivedMs) {
    return sourceMs - receivedMs < 0;
  }

  static isPastTime(sourceMs, receivedMs) {
    return sourceMs - receivedMs > 0;
  }

  static isTimeOlderByDays(sourceMs, receivedMs, daysAmount) {
    const oneDayMs = 86_400_000;
    return (sourceMs - receivedMs) > (oneDayMs * daysAmount);
  }
}

module.exports = DateUtil;
