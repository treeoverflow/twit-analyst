const express = require('express');
const {getMentions} = require('./src/api/analyst.js');
const DateUtil = require("./src/util/date-util");
const app = express();
const port = 3000;

app.get('/mentions', async (req, res) => {
    const {filterBy: keyword, startTime, endTime} = req.query;
    const currentTimeMs = Date.now();
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
        if (isNaN(startTimeMs)) {
            res.send('startTime should be ISO 8601 format');
            return;
        }

        if (!DateUtil.isPastDate(currentTimeMs, startTimeMs)) {
            res.send('startTime should be past time');
            return
        }

        if (DateUtil.isDateOlderThanSevenDays(currentTimeMs, startTimeMs)) {
            res.send('startTime should be no more than 7 days ago');
            return;
        }
        startTimeISO = new Date(startTime).toISOString();
    }

    if (endTime) {
        endTimeMs = Date.parse(endTime);
        if (isNaN(endTimeMs)) {
            res.send('endTime should be ISO 8601 format');
            return;
        }

        if (DateUtil.isFutureDate(currentTimeMs, endTimeMs)) {
            res.send('endTime should be present or past time');
            return;
        }

        if (DateUtil.isDateOlderByDays(currentTimeMs, endTimeMs, 7)) {
            res.send('endTime should be no more than 7 days ago');
            return;
        }

        if (startTime && !DateUtil.isFutureDate(startTimeMs, endTimeMs)) {
            res.send('endTime should be after startTime');
        }
        endTimeISO = new Date(endTime).toISOString();
    }

    const mentionData = await getMentions(keyword, startTimeISO, endTimeISO);
    res.send(mentionData);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

function isValidKeyword(filterBy) {
    return filterBy && (/^[^\W_]{1,512}$/.test(filterBy));
}