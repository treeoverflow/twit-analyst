const needle = require('needle');
require('dotenv').config();

const token = process.env.TWITTER_API_KEY;
const endpointURL = 'https://api.twitter.com/2/tweets/counts/recent';

const getMentions = async (keyword) => {
    const params = {
        'query': keyword
    }

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${token}`
        }
    });

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

module.exports = { getMentions }
