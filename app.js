const express = require('express');
const { check, validationResult } = require('express-validator');
const { getTwitterMentionsCount } = require('./src/sm-tracking/twitter-mentions-count');
const DateUtil = require('./src/util/date-util');

const app = express();
const port = 3000;
const keywordPattern = /^[^\W_]{1,512}$/;
const maxObservableDays = 7;

function isValidStartTime(currentTimeMs, timeISO) {
  const startTimeMs = Date.parse(timeISO);
  return DateUtil.isPastTime(currentTimeMs, startTimeMs)
    && !DateUtil.isTimeOlderByDays(currentTimeMs, startTimeMs, maxObservableDays);
}

function isValidEndTime(currentTimeMs, timeISO) {
  const endTimeMs = Date.parse(timeISO);
  return !DateUtil.isFutureTime(currentTimeMs, endTimeMs)
    && !DateUtil.isTimeOlderByDays(currentTimeMs, endTimeMs, maxObservableDays);
}

function isEndTimeComingAfterStartTime() {
  return (endTime, { req }) => {
    const { startTime } = req.query;
    return DateUtil.isFutureTime(Date.parse(startTime), Date.parse(endTime));
  };
}

app.get(
  '/mentions',

  async (req, res) => {
    let currentTimeMs;

    await check('filterBy')
      .exists()
      .withMessage('filterBy should exist')
      .bail()
      .matches(keywordPattern)
      .withMessage('filterBy has invalid value')
      .run(req);

    if (req.query.startTime || req.query.endTime) currentTimeMs = Date.now();

    await check('startTime')
      .optional()
      .isISO8601()
      .withMessage('startTime should be ISO 8601 format')
      .bail()
      .custom((startTime) => isValidStartTime(currentTimeMs, startTime))
      .withMessage('startTime should be past time and be no more than 7 days ago')
      .run(req);

    await check('endTime')
      .optional()
      .isISO8601()
      .withMessage('endTime should be ISO 8601 format')
      .bail()
      .custom((endTime) => isValidEndTime(currentTimeMs, endTime))
      .withMessage('endTime should be present or past time and be no more than 7 days ago')
      .if(check('startTime').exists())
      .custom(isEndTimeComingAfterStartTime())
      .withMessage('endTime should be after startTime')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { filterBy: keyword, startTime, endTime } = req.query;
    let startTimeISO;
    let endTimeISO;

    if (startTime) startTimeISO = new Date(startTime).toISOString();
    if (endTime) endTimeISO = new Date(endTime).toISOString();

    const mentionData = await getTwitterMentionsCount(keyword, startTimeISO, endTimeISO);
    res.send(mentionData);
  }
);

app.listen(port);
