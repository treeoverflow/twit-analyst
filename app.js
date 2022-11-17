const express = require('express');
const { getMentions } = require('./src/api/analyst');
const DateUtil = require('./src/util/date-util');

const app = express();
const port = 3000;
const keywordRegexp = /^[^\W_]{1,512}$/;

function isValidKeyword(keyword) {
  return keyword && keywordRegexp.test(keyword);
}

app.get('/mentions', async (req, res) => {
  const { filterBy: keyword, startTime, endTime } = req.query;
  const currentTimeMs = Date.now();
  const maxObservableDays = 7;
  let startTimeISO;
  let endTimeISO;
  let startTimeMs;
  let endTimeMs;

  if (!isValidKeyword(keyword)) {
    res.send('filterBy should exist');
    return;
  }

  if (startTime) {
    startTimeMs = Date.parse(startTime);
    if (Number.isNaN(startTimeMs)) {
      res.send('startTime should be ISO 8601 format');
      return;
    }

    if (!DateUtil.isPastTime(currentTimeMs, startTimeMs)) {
      res.send('startTime should be past time');
      return;
    }

    if (DateUtil.isTimeOlderByDays(currentTimeMs, startTimeMs, maxObservableDays)) {
      res.send('startTime should be no more than 7 days ago');
      return;
    }
    startTimeISO = new Date(startTime).toISOString();
  }

  if (endTime) {
    endTimeMs = Date.parse(endTime);
    if (Number.isNaN(endTimeMs)) {
      res.send('endTime should be ISO 8601 format');
      return;
    }

    if (DateUtil.isFutureTime(currentTimeMs, endTimeMs)) {
      res.send('endTime should be present or past time');
      return;
    }

    if (DateUtil.isTimeOlderByDays(currentTimeMs, endTimeMs, maxObservableDays)) {
      res.send('endTime should be no more than 7 days ago');
      return;
    }

    if (startTime && !DateUtil.isFutureTime(startTimeMs, endTimeMs)) {
      res.send('endTime should be after startTime');
    }
    endTimeISO = new Date(endTime).toISOString();
  }

  const mentionData = await getMentions(keyword, startTimeISO, endTimeISO);
  res.send(mentionData);
});

app.listen(port);
