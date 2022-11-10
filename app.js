const { getMentions } = require('./api/analyst.js');
const express = require('express');
const app = express();
const port = 3000;

app.get('/mentions', async (req, res) => {
    const data = await getMentions(req.query.filterBy);
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});