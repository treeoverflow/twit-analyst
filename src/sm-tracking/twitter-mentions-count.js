require('dotenv').config();
const needle = require('needle');

const token = process.env.TWITTER_API_KEY;
const endpointURL = 'https://api.twitter.com/2/tweets/counts/recent';

const getTwitterMentionsCount = async (keyword, startTime, endTime) => {
  const params = {
    query: keyword,
  };
  if (startTime) params.start_time = startTime;
  if (endTime) params.end_time = endTime;

  try {
    const res = await needle('get', endpointURL, params, {
      headers: {
        'User-Agent': 'v2TweetLookupJS',
        authorization: `Bearer ${token}`,
      },
    });

    return res.body;
  } catch (e) {
    throw new Error('Unsuccessful request');
  }
};

module.exports = { getTwitterMentionsCount };
