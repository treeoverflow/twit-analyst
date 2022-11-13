const express = require('express');
const {getMentions} = require('./src/api/analyst.js');
const DateUtil = require("./src/util/date-util");
const app = express();
const port = 3000;

app.get('/mentions', async (req, res) => {
    const {filterBy, startTime, endTime} = req.query;
    const nowMs = Date.now();
    let startTimeISO, endTimeISO, startTimeMs, endTimeMs;

    if (!validFilterBy(filterBy)) {
        res.send('filterBy should exist');
        return;
    }

    if (startTime) {
        startTimeMs = Date.parse(startTime);
        if (isNaN(startTimeMs)) {
            res.send('startTime should be ISO 8601 format');
            return;
        }

        if (!DateUtil.isPastDate(nowMs, startTimeMs)) {
            res.send('startTime should be past time');
            return
        }

        if (DateUtil.isDateOlderThanSevenDays(nowMs, startTimeMs)) {
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

        if (DateUtil.isFutureDate(nowMs, endTimeMs)) {
            res.send('endTime should be present or past time');
            return;
        }

        if (DateUtil.isDateOlderThanSevenDays(nowMs, endTimeMs)) {
            res.send('endTime should be no more than 7 days ago');
            return;
        }

        if (startTime && !DateUtil.isFutureDate(startTimeMs, endTimeMs)) {
            res.send('endTime should be after startTime');
        }
        endTimeISO = new Date(endTime).toISOString();
    }

    const data = await getMentions(filterBy, startTimeISO, endTimeISO);
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

function validFilterBy(filterBy) {
    return filterBy ? /^[^\W_]{1,512}$/.test(filterBy) : false;
}