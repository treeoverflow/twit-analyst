const express = require('express');
const { query, validationResult } = require('express-validator');
const { getMentions } = require('./src/api/analyst');
const DateUtil = require('./src/util/date-util');

const app = express();
const port = 3000;
const keywordRegexp = /^[^\W_]{1,512}$/;
const maxObservableDays = 7;

function isValidStartTime(timeISO) {
  const currentTimeMs = Date.now();
  const startTimeMs = Date.parse(timeISO);
  return DateUtil.isPastTime(currentTimeMs, startTimeMs)
    && !DateUtil.isTimeOlderByDays(currentTimeMs, startTimeMs, maxObservableDays);
}

function isValidEndTime(timeISO) {
  const currentTimeMs = Date.now();
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
  query('filterBy')
    .exists()
    .withMessage('filterBy should exist')
    .matches(keywordRegexp)
    .withMessage('filterBy has invalid value'),

  query('startTime')
    .optional()
    .isISO8601()
    .withMessage('startTime should be ISO 8601 format')
    .custom((startTime) => isValidStartTime(startTime))
    .withMessage('startTime should be past time and be no more than 7 days ago'),

  query('endTime')
    .optional()
    .isISO8601()
    .withMessage('endTime should be ISO 8601 format')
    .custom((endTime) => isValidEndTime(endTime))
    .withMessage('endTime should be present or past time and be no more than 7 days ago')
    .if(query('startTime').exists())
    .custom(isEndTimeComingAfterStartTime())
    .withMessage('endTime should be after startTime'),

  async (req, res) => {
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

    const mentionData = await getMentions(keyword, startTimeISO, endTimeISO);
    res.send(mentionData);
  },
);

app.listen(port);
