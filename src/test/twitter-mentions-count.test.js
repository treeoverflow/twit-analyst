const needle = require('needle');
const { getTwitterMentionsCount } = require('../sm-tracking/twitter-mentions-count');

const endpointURL = 'https://api.twitter.com/2/tweets/counts/recent';
const token = process.env.TWITTER_API_KEY;

const mockedMentionsByKeyword = {
  data: [
    {
      end: '2022-12-02T21:00:00.000Z',
      start: '2022-12-02T20:24:04.000Z',
      tweet_count: 48,
    },
    {
      end: '2022-12-02T22:00:00.000Z',
      start: '2022-12-02T21:00:00.000Z',
      tweet_count: 78,
    },
    {
      end: '2022-12-02T23:00:00.000Z',
      start: '2022-12-02T22:00:00.000Z',
      tweet_count: 36,
    },
    {
      end: '2022-12-03T00:00:00.000Z',
      start: '2022-12-02T23:00:00.000Z',
      tweet_count: 30,
    },
    {
      end: '2022-12-03T01:00:00.000Z',
      start: '2022-12-03T00:00:00.000Z',
      tweet_count: 110,
    },
    {
      end: '2022-12-03T02:00:00.000Z',
      start: '2022-12-03T01:00:00.000Z',
      tweet_count: 64,
    },
    {
      end: '2022-12-03T03:00:00.000Z',
      start: '2022-12-03T02:00:00.000Z',
      tweet_count: 56,
    },
    {
      end: '2022-12-03T04:00:00.000Z',
      start: '2022-12-03T03:00:00.000Z',
      tweet_count: 49,
    },
    {
      end: '2022-12-03T05:00:00.000Z',
      start: '2022-12-03T04:00:00.000Z',
      tweet_count: 47,
    },
    {
      end: '2022-12-03T06:00:00.000Z',
      start: '2022-12-03T05:00:00.000Z',
      tweet_count: 67,
    },
    {
      end: '2022-12-03T07:00:00.000Z',
      start: '2022-12-03T06:00:00.000Z',
      tweet_count: 49,
    },
    {
      end: '2022-12-03T08:00:00.000Z',
      start: '2022-12-03T07:00:00.000Z',
      tweet_count: 34,
    },
    {
      end: '2022-12-03T09:00:00.000Z',
      start: '2022-12-03T08:00:00.000Z',
      tweet_count: 34,
    },
    {
      end: '2022-12-03T10:00:00.000Z',
      start: '2022-12-03T09:00:00.000Z',
      tweet_count: 39,
    },
    {
      end: '2022-12-03T11:00:00.000Z',
      start: '2022-12-03T10:00:00.000Z',
      tweet_count: 40,
    },
    {
      end: '2022-12-03T12:00:00.000Z',
      start: '2022-12-03T11:00:00.000Z',
      tweet_count: 44,
    },
    {
      end: '2022-12-03T13:00:00.000Z',
      start: '2022-12-03T12:00:00.000Z',
      tweet_count: 146,
    },
    {
      end: '2022-12-03T14:00:00.000Z',
      start: '2022-12-03T13:00:00.000Z',
      tweet_count: 80,
    },
    {
      end: '2022-12-03T15:00:00.000Z',
      start: '2022-12-03T14:00:00.000Z',
      tweet_count: 66,
    },
    {
      end: '2022-12-03T16:00:00.000Z',
      start: '2022-12-03T15:00:00.000Z',
      tweet_count: 64,
    },
    {
      end: '2022-12-03T17:00:00.000Z',
      start: '2022-12-03T16:00:00.000Z',
      tweet_count: 56,
    },
    {
      end: '2022-12-03T18:00:00.000Z',
      start: '2022-12-03T17:00:00.000Z',
      tweet_count: 52,
    },
    {
      end: '2022-12-03T19:00:00.000Z',
      start: '2022-12-03T18:00:00.000Z',
      tweet_count: 39,
    },
    {
      end: '2022-12-03T20:00:00.000Z',
      start: '2022-12-03T19:00:00.000Z',
      tweet_count: 29,
    },
    {
      end: '2022-12-03T21:00:00.000Z',
      start: '2022-12-03T20:00:00.000Z',
      tweet_count: 53,
    },
    {
      end: '2022-12-03T22:00:00.000Z',
      start: '2022-12-03T21:00:00.000Z',
      tweet_count: 33,
    },
    {
      end: '2022-12-03T23:00:00.000Z',
      start: '2022-12-03T22:00:00.000Z',
      tweet_count: 31,
    },
    {
      end: '2022-12-04T00:00:00.000Z',
      start: '2022-12-03T23:00:00.000Z',
      tweet_count: 52,
    },
    {
      end: '2022-12-04T01:00:00.000Z',
      start: '2022-12-04T00:00:00.000Z',
      tweet_count: 34,
    },
    {
      end: '2022-12-04T02:00:00.000Z',
      start: '2022-12-04T01:00:00.000Z',
      tweet_count: 16,
    },
    {
      end: '2022-12-04T03:00:00.000Z',
      start: '2022-12-04T02:00:00.000Z',
      tweet_count: 31,
    },
    {
      end: '2022-12-04T04:00:00.000Z',
      start: '2022-12-04T03:00:00.000Z',
      tweet_count: 28,
    },
    {
      end: '2022-12-04T05:00:00.000Z',
      start: '2022-12-04T04:00:00.000Z',
      tweet_count: 31,
    },
    {
      end: '2022-12-04T06:00:00.000Z',
      start: '2022-12-04T05:00:00.000Z',
      tweet_count: 27,
    },
    {
      end: '2022-12-04T07:00:00.000Z',
      start: '2022-12-04T06:00:00.000Z',
      tweet_count: 25,
    },
    {
      end: '2022-12-04T08:00:00.000Z',
      start: '2022-12-04T07:00:00.000Z',
      tweet_count: 20,
    },
    {
      end: '2022-12-04T09:00:00.000Z',
      start: '2022-12-04T08:00:00.000Z',
      tweet_count: 30,
    },
    {
      end: '2022-12-04T10:00:00.000Z',
      start: '2022-12-04T09:00:00.000Z',
      tweet_count: 34,
    },
    {
      end: '2022-12-04T11:00:00.000Z',
      start: '2022-12-04T10:00:00.000Z',
      tweet_count: 21,
    },
    {
      end: '2022-12-04T12:00:00.000Z',
      start: '2022-12-04T11:00:00.000Z',
      tweet_count: 27,
    },
    {
      end: '2022-12-04T13:00:00.000Z',
      start: '2022-12-04T12:00:00.000Z',
      tweet_count: 28,
    },
    {
      end: '2022-12-04T14:00:00.000Z',
      start: '2022-12-04T13:00:00.000Z',
      tweet_count: 22,
    },
    {
      end: '2022-12-04T15:00:00.000Z',
      start: '2022-12-04T14:00:00.000Z',
      tweet_count: 141,
    },
    {
      end: '2022-12-04T16:00:00.000Z',
      start: '2022-12-04T15:00:00.000Z',
      tweet_count: 159,
    },
    {
      end: '2022-12-04T17:00:00.000Z',
      start: '2022-12-04T16:00:00.000Z',
      tweet_count: 100,
    },
    {
      end: '2022-12-04T18:00:00.000Z',
      start: '2022-12-04T17:00:00.000Z',
      tweet_count: 57,
    },
    {
      end: '2022-12-04T19:00:00.000Z',
      start: '2022-12-04T18:00:00.000Z',
      tweet_count: 67,
    },
    {
      end: '2022-12-04T20:00:00.000Z',
      start: '2022-12-04T19:00:00.000Z',
      tweet_count: 38,
    },
    {
      end: '2022-12-04T21:00:00.000Z',
      start: '2022-12-04T20:00:00.000Z',
      tweet_count: 27,
    },
    {
      end: '2022-12-04T22:00:00.000Z',
      start: '2022-12-04T21:00:00.000Z',
      tweet_count: 35,
    },
    {
      end: '2022-12-04T23:00:00.000Z',
      start: '2022-12-04T22:00:00.000Z',
      tweet_count: 76,
    },
    {
      end: '2022-12-05T00:00:00.000Z',
      start: '2022-12-04T23:00:00.000Z',
      tweet_count: 34,
    },
    {
      end: '2022-12-05T01:00:00.000Z',
      start: '2022-12-05T00:00:00.000Z',
      tweet_count: 131,
    },
    {
      end: '2022-12-05T02:00:00.000Z',
      start: '2022-12-05T01:00:00.000Z',
      tweet_count: 73,
    },
    {
      end: '2022-12-05T03:00:00.000Z',
      start: '2022-12-05T02:00:00.000Z',
      tweet_count: 50,
    },
    {
      end: '2022-12-05T04:00:00.000Z',
      start: '2022-12-05T03:00:00.000Z',
      tweet_count: 71,
    },
    {
      end: '2022-12-05T05:00:00.000Z',
      start: '2022-12-05T04:00:00.000Z',
      tweet_count: 57,
    },
    {
      end: '2022-12-05T06:00:00.000Z',
      start: '2022-12-05T05:00:00.000Z',
      tweet_count: 38,
    },
    {
      end: '2022-12-05T07:00:00.000Z',
      start: '2022-12-05T06:00:00.000Z',
      tweet_count: 34,
    },
    {
      end: '2022-12-05T08:00:00.000Z',
      start: '2022-12-05T07:00:00.000Z',
      tweet_count: 31,
    },
    {
      end: '2022-12-05T09:00:00.000Z',
      start: '2022-12-05T08:00:00.000Z',
      tweet_count: 40,
    },
    {
      end: '2022-12-05T10:00:00.000Z',
      start: '2022-12-05T09:00:00.000Z',
      tweet_count: 43,
    },
    {
      end: '2022-12-05T11:00:00.000Z',
      start: '2022-12-05T10:00:00.000Z',
      tweet_count: 52,
    },
    {
      end: '2022-12-05T12:00:00.000Z',
      start: '2022-12-05T11:00:00.000Z',
      tweet_count: 81,
    },
    {
      end: '2022-12-05T13:00:00.000Z',
      start: '2022-12-05T12:00:00.000Z',
      tweet_count: 82,
    },
    {
      end: '2022-12-05T14:00:00.000Z',
      start: '2022-12-05T13:00:00.000Z',
      tweet_count: 89,
    },
    {
      end: '2022-12-05T15:00:00.000Z',
      start: '2022-12-05T14:00:00.000Z',
      tweet_count: 65,
    },
    {
      end: '2022-12-05T16:00:00.000Z',
      start: '2022-12-05T15:00:00.000Z',
      tweet_count: 87,
    },
    {
      end: '2022-12-05T17:00:00.000Z',
      start: '2022-12-05T16:00:00.000Z',
      tweet_count: 52,
    },
    {
      end: '2022-12-05T18:00:00.000Z',
      start: '2022-12-05T17:00:00.000Z',
      tweet_count: 48,
    },
    {
      end: '2022-12-05T19:00:00.000Z',
      start: '2022-12-05T18:00:00.000Z',
      tweet_count: 59,
    },
    {
      end: '2022-12-05T20:00:00.000Z',
      start: '2022-12-05T19:00:00.000Z',
      tweet_count: 69,
    },
    {
      end: '2022-12-05T21:00:00.000Z',
      start: '2022-12-05T20:00:00.000Z',
      tweet_count: 60,
    },
    {
      end: '2022-12-05T22:00:00.000Z',
      start: '2022-12-05T21:00:00.000Z',
      tweet_count: 71,
    },
    {
      end: '2022-12-05T23:00:00.000Z',
      start: '2022-12-05T22:00:00.000Z',
      tweet_count: 66,
    },
    {
      end: '2022-12-06T00:00:00.000Z',
      start: '2022-12-05T23:00:00.000Z',
      tweet_count: 73,
    },
    {
      end: '2022-12-06T01:00:00.000Z',
      start: '2022-12-06T00:00:00.000Z',
      tweet_count: 63,
    },
    {
      end: '2022-12-06T02:00:00.000Z',
      start: '2022-12-06T01:00:00.000Z',
      tweet_count: 76,
    },
    {
      end: '2022-12-06T03:00:00.000Z',
      start: '2022-12-06T02:00:00.000Z',
      tweet_count: 74,
    },
    {
      end: '2022-12-06T04:00:00.000Z',
      start: '2022-12-06T03:00:00.000Z',
      tweet_count: 259,
    },
    {
      end: '2022-12-06T05:00:00.000Z',
      start: '2022-12-06T04:00:00.000Z',
      tweet_count: 187,
    },
    {
      end: '2022-12-06T06:00:00.000Z',
      start: '2022-12-06T05:00:00.000Z',
      tweet_count: 188,
    },
    {
      end: '2022-12-06T07:00:00.000Z',
      start: '2022-12-06T06:00:00.000Z',
      tweet_count: 117,
    },
    {
      end: '2022-12-06T08:00:00.000Z',
      start: '2022-12-06T07:00:00.000Z',
      tweet_count: 118,
    },
    {
      end: '2022-12-06T09:00:00.000Z',
      start: '2022-12-06T08:00:00.000Z',
      tweet_count: 80,
    },
    {
      end: '2022-12-06T10:00:00.000Z',
      start: '2022-12-06T09:00:00.000Z',
      tweet_count: 88,
    },
    {
      end: '2022-12-06T11:00:00.000Z',
      start: '2022-12-06T10:00:00.000Z',
      tweet_count: 105,
    },
    {
      end: '2022-12-06T12:00:00.000Z',
      start: '2022-12-06T11:00:00.000Z',
      tweet_count: 145,
    },
    {
      end: '2022-12-06T13:00:00.000Z',
      start: '2022-12-06T12:00:00.000Z',
      tweet_count: 82,
    },
    {
      end: '2022-12-06T14:00:00.000Z',
      start: '2022-12-06T13:00:00.000Z',
      tweet_count: 79,
    },
    {
      end: '2022-12-06T15:00:00.000Z',
      start: '2022-12-06T14:00:00.000Z',
      tweet_count: 138,
    },
    {
      end: '2022-12-06T16:00:00.000Z',
      start: '2022-12-06T15:00:00.000Z',
      tweet_count: 73,
    },
    {
      end: '2022-12-06T17:00:00.000Z',
      start: '2022-12-06T16:00:00.000Z',
      tweet_count: 73,
    },
    {
      end: '2022-12-06T18:00:00.000Z',
      start: '2022-12-06T17:00:00.000Z',
      tweet_count: 62,
    },
    {
      end: '2022-12-06T19:00:00.000Z',
      start: '2022-12-06T18:00:00.000Z',
      tweet_count: 54,
    },
    {
      end: '2022-12-06T20:00:00.000Z',
      start: '2022-12-06T19:00:00.000Z',
      tweet_count: 43,
    },
    {
      end: '2022-12-06T21:00:00.000Z',
      start: '2022-12-06T20:00:00.000Z',
      tweet_count: 41,
    },
    {
      end: '2022-12-06T22:00:00.000Z',
      start: '2022-12-06T21:00:00.000Z',
      tweet_count: 40,
    },
    {
      end: '2022-12-06T23:00:00.000Z',
      start: '2022-12-06T22:00:00.000Z',
      tweet_count: 28,
    },
    {
      end: '2022-12-07T00:00:00.000Z',
      start: '2022-12-06T23:00:00.000Z',
      tweet_count: 25,
    },
    {
      end: '2022-12-07T01:00:00.000Z',
      start: '2022-12-07T00:00:00.000Z',
      tweet_count: 117,
    },
    {
      end: '2022-12-07T02:00:00.000Z',
      start: '2022-12-07T01:00:00.000Z',
      tweet_count: 67,
    },
    {
      end: '2022-12-07T03:00:00.000Z',
      start: '2022-12-07T02:00:00.000Z',
      tweet_count: 52,
    },
    {
      end: '2022-12-07T04:00:00.000Z',
      start: '2022-12-07T03:00:00.000Z',
      tweet_count: 79,
    },
    {
      end: '2022-12-07T05:00:00.000Z',
      start: '2022-12-07T04:00:00.000Z',
      tweet_count: 43,
    },
    {
      end: '2022-12-07T06:00:00.000Z',
      start: '2022-12-07T05:00:00.000Z',
      tweet_count: 163,
    },
    {
      end: '2022-12-07T07:00:00.000Z',
      start: '2022-12-07T06:00:00.000Z',
      tweet_count: 147,
    },
    {
      end: '2022-12-07T08:00:00.000Z',
      start: '2022-12-07T07:00:00.000Z',
      tweet_count: 109,
    },
    {
      end: '2022-12-07T09:00:00.000Z',
      start: '2022-12-07T08:00:00.000Z',
      tweet_count: 92,
    },
    {
      end: '2022-12-07T10:00:00.000Z',
      start: '2022-12-07T09:00:00.000Z',
      tweet_count: 90,
    },
    {
      end: '2022-12-07T11:00:00.000Z',
      start: '2022-12-07T10:00:00.000Z',
      tweet_count: 88,
    },
    {
      end: '2022-12-07T12:00:00.000Z',
      start: '2022-12-07T11:00:00.000Z',
      tweet_count: 82,
    },
    {
      end: '2022-12-07T13:00:00.000Z',
      start: '2022-12-07T12:00:00.000Z',
      tweet_count: 83,
    },
    {
      end: '2022-12-07T14:00:00.000Z',
      start: '2022-12-07T13:00:00.000Z',
      tweet_count: 68,
    },
    {
      end: '2022-12-07T15:00:00.000Z',
      start: '2022-12-07T14:00:00.000Z',
      tweet_count: 63,
    },
    {
      end: '2022-12-07T16:00:00.000Z',
      start: '2022-12-07T15:00:00.000Z',
      tweet_count: 67,
    },
    {
      end: '2022-12-07T17:00:00.000Z',
      start: '2022-12-07T16:00:00.000Z',
      tweet_count: 55,
    },
    {
      end: '2022-12-07T18:00:00.000Z',
      start: '2022-12-07T17:00:00.000Z',
      tweet_count: 52,
    },
    {
      end: '2022-12-07T19:00:00.000Z',
      start: '2022-12-07T18:00:00.000Z',
      tweet_count: 37,
    },
    {
      end: '2022-12-07T20:00:00.000Z',
      start: '2022-12-07T19:00:00.000Z',
      tweet_count: 33,
    },
    {
      end: '2022-12-07T21:00:00.000Z',
      start: '2022-12-07T20:00:00.000Z',
      tweet_count: 25,
    },
    {
      end: '2022-12-07T22:00:00.000Z',
      start: '2022-12-07T21:00:00.000Z',
      tweet_count: 183,
    },
    {
      end: '2022-12-07T23:00:00.000Z',
      start: '2022-12-07T22:00:00.000Z',
      tweet_count: 129,
    },
    {
      end: '2022-12-08T00:00:00.000Z',
      start: '2022-12-07T23:00:00.000Z',
      tweet_count: 88,
    },
    {
      end: '2022-12-08T01:00:00.000Z',
      start: '2022-12-08T00:00:00.000Z',
      tweet_count: 75,
    },
    {
      end: '2022-12-08T02:00:00.000Z',
      start: '2022-12-08T01:00:00.000Z',
      tweet_count: 48,
    },
    {
      end: '2022-12-08T03:00:00.000Z',
      start: '2022-12-08T02:00:00.000Z',
      tweet_count: 59,
    },
    {
      end: '2022-12-08T04:00:00.000Z',
      start: '2022-12-08T03:00:00.000Z',
      tweet_count: 69,
    },
    {
      end: '2022-12-08T05:00:00.000Z',
      start: '2022-12-08T04:00:00.000Z',
      tweet_count: 56,
    },
    {
      end: '2022-12-08T06:00:00.000Z',
      start: '2022-12-08T05:00:00.000Z',
      tweet_count: 115,
    },
    {
      end: '2022-12-08T07:00:00.000Z',
      start: '2022-12-08T06:00:00.000Z',
      tweet_count: 251,
    },
    {
      end: '2022-12-08T08:00:00.000Z',
      start: '2022-12-08T07:00:00.000Z',
      tweet_count: 194,
    },
    {
      end: '2022-12-08T09:00:00.000Z',
      start: '2022-12-08T08:00:00.000Z',
      tweet_count: 1058,
    },
    {
      end: '2022-12-08T10:00:00.000Z',
      start: '2022-12-08T09:00:00.000Z',
      tweet_count: 184,
    },
    {
      end: '2022-12-08T11:00:00.000Z',
      start: '2022-12-08T10:00:00.000Z',
      tweet_count: 112,
    },
    {
      end: '2022-12-08T12:00:00.000Z',
      start: '2022-12-08T11:00:00.000Z',
      tweet_count: 132,
    },
    {
      end: '2022-12-08T13:00:00.000Z',
      start: '2022-12-08T12:00:00.000Z',
      tweet_count: 167,
    },
    {
      end: '2022-12-08T14:00:00.000Z',
      start: '2022-12-08T13:00:00.000Z',
      tweet_count: 88,
    },
    {
      end: '2022-12-08T15:00:00.000Z',
      start: '2022-12-08T14:00:00.000Z',
      tweet_count: 86,
    },
    {
      end: '2022-12-08T16:00:00.000Z',
      start: '2022-12-08T15:00:00.000Z',
      tweet_count: 114,
    },
    {
      end: '2022-12-08T17:00:00.000Z',
      start: '2022-12-08T16:00:00.000Z',
      tweet_count: 111,
    },
    {
      end: '2022-12-08T18:00:00.000Z',
      start: '2022-12-08T17:00:00.000Z',
      tweet_count: 65,
    },
    {
      end: '2022-12-08T19:00:00.000Z',
      start: '2022-12-08T18:00:00.000Z',
      tweet_count: 101,
    },
    {
      end: '2022-12-08T20:00:00.000Z',
      start: '2022-12-08T19:00:00.000Z',
      tweet_count: 53,
    },
    {
      end: '2022-12-08T21:00:00.000Z',
      start: '2022-12-08T20:00:00.000Z',
      tweet_count: 53,
    },
    {
      end: '2022-12-08T22:00:00.000Z',
      start: '2022-12-08T21:00:00.000Z',
      tweet_count: 59,
    },
    {
      end: '2022-12-08T23:00:00.000Z',
      start: '2022-12-08T22:00:00.000Z',
      tweet_count: 40,
    },
    {
      end: '2022-12-09T00:00:00.000Z',
      start: '2022-12-08T23:00:00.000Z',
      tweet_count: 44,
    },
    {
      end: '2022-12-09T01:00:00.000Z',
      start: '2022-12-09T00:00:00.000Z',
      tweet_count: 37,
    },
    {
      end: '2022-12-09T02:00:00.000Z',
      start: '2022-12-09T01:00:00.000Z',
      tweet_count: 42,
    },
    {
      end: '2022-12-09T03:00:00.000Z',
      start: '2022-12-09T02:00:00.000Z',
      tweet_count: 31,
    },
    {
      end: '2022-12-09T04:00:00.000Z',
      start: '2022-12-09T03:00:00.000Z',
      tweet_count: 46,
    },
    {
      end: '2022-12-09T05:00:00.000Z',
      start: '2022-12-09T04:00:00.000Z',
      tweet_count: 49,
    },
    {
      end: '2022-12-09T06:00:00.000Z',
      start: '2022-12-09T05:00:00.000Z',
      tweet_count: 49,
    },
    {
      end: '2022-12-09T07:00:00.000Z',
      start: '2022-12-09T06:00:00.000Z',
      tweet_count: 66,
    },
    {
      end: '2022-12-09T08:00:00.000Z',
      start: '2022-12-09T07:00:00.000Z',
      tweet_count: 92,
    },
    {
      end: '2022-12-09T09:00:00.000Z',
      start: '2022-12-09T08:00:00.000Z',
      tweet_count: 101,
    },
    {
      end: '2022-12-09T10:00:00.000Z',
      start: '2022-12-09T09:00:00.000Z',
      tweet_count: 69,
    },
    {
      end: '2022-12-09T11:00:00.000Z',
      start: '2022-12-09T10:00:00.000Z',
      tweet_count: 57,
    },
    {
      end: '2022-12-09T12:00:00.000Z',
      start: '2022-12-09T11:00:00.000Z',
      tweet_count: 69,
    },
    {
      end: '2022-12-09T13:00:00.000Z',
      start: '2022-12-09T12:00:00.000Z',
      tweet_count: 78,
    },
    {
      end: '2022-12-09T14:00:00.000Z',
      start: '2022-12-09T13:00:00.000Z',
      tweet_count: 47,
    },
    {
      end: '2022-12-09T15:00:00.000Z',
      start: '2022-12-09T14:00:00.000Z',
      tweet_count: 70,
    },
    {
      end: '2022-12-09T16:00:00.000Z',
      start: '2022-12-09T15:00:00.000Z',
      tweet_count: 59,
    },
    {
      end: '2022-12-09T17:00:00.000Z',
      start: '2022-12-09T16:00:00.000Z',
      tweet_count: 45,
    },
    {
      end: '2022-12-09T18:00:00.000Z',
      start: '2022-12-09T17:00:00.000Z',
      tweet_count: 73,
    },
    {
      end: '2022-12-09T19:00:00.000Z',
      start: '2022-12-09T18:00:00.000Z',
      tweet_count: 60,
    },
    {
      end: '2022-12-09T20:00:00.000Z',
      start: '2022-12-09T19:00:00.000Z',
      tweet_count: 39,
    },
    {
      end: '2022-12-09T20:24:04.000Z',
      start: '2022-12-09T20:00:00.000Z',
      tweet_count: 17,
    },
  ],
  meta: {
    total_tweet_count: 12936,
  },
};

jest.mock('needle');

describe('getTwitterMentionsCount', () => {
  it('should throw error on failed request', () => {
    needle.mockRejectedValue({});
    const result = getTwitterMentionsCount('posi');

    expect(result).rejects.toThrow('Unsuccessful request');
  });

  describe('with parameters', () => {
    it('should call needle with keyword parameter', async () => {
      needle.mockResolvedValue({
        body: mockedMentionsByKeyword,
      });

      const keyword = 'posi';
      await getTwitterMentionsCount(keyword);

      const params = {
        query: keyword,
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`,
        },
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
    });

    it('should call needle with startTime parameter', async () => {
      needle.mockResolvedValue({
        body: mockedMentionsByKeyword,
      });

      const keyword = 'posi';
      const startTime = '2022-11-20T03:00:00+0300';
      await getTwitterMentionsCount(keyword, startTime);

      const params = {
        query: keyword,
        start_time: startTime,
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`,
        },
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
    });

    it('should call needle with endTime parameter', async () => {
      needle.mockResolvedValue({
        body: mockedMentionsByKeyword,
      });

      const keyword = 'posi';
      const endTime = '2022-11-20T03:00:00+0300';
      await getTwitterMentionsCount(keyword, undefined, endTime);

      const params = {
        query: keyword,
        end_time: endTime,
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`,
        },
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
    });
  });

  describe('data flow', () => {
    it('should return mentions as it is (without any formatting)', async () => {
      needle.mockResolvedValue({
        body: mockedMentionsByKeyword,
      });

      const keyword = 'posi';
      const result = await getTwitterMentionsCount(keyword);

      const params = {
        query: keyword,
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`,
        },
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
      expect(result).toEqual(mockedMentionsByKeyword);
    });
  });
});
