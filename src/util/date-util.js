class DateUtil {

    static isFutureDate(sourceMs, receivedMs) {
        return sourceMs - receivedMs < 0;
    }

    static isPastDate(sourceMs, receivedMs) {
        return sourceMs - receivedMs > 0;
    }

    static isDateOlderByDays(sourceMs, receivedMs, daysAmount) {
        const oneDayMs = 86_400_000;
        return (sourceMs - receivedMs) > (oneDayMs * daysAmount);
    }
}

module.exports = DateUtil;