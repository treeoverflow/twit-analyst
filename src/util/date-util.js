class DateUtil {

    static isFutureDate(sourceMs, receivedMs) {
        return sourceMs - receivedMs < 0;
    }

    static isPastDate(sourceMs, receivedMs) {
        return sourceMs - receivedMs > 0;
    }

    static isDateOlderThanSevenDays(sourceMs, receivedMs) {
        return (sourceMs - receivedMs) > 604_800_000;
    }
}

module.exports = DateUtil;