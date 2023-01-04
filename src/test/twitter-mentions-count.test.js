const needle = require('needle');
const { getTwitterMentionsCount } = require('../sm-tracking/twitter-mentions-count');

const endpointURL = 'https://api.twitter.com/2/tweets/counts/recent';
const token = process.env.TWITTER_API_KEY;

const mockedMentionsByKeyword = {
  data: [
    {
      end: '2022-12-02T21:00:00.000Z',
      start: '2022-12-02T20:24:04.000Z',
      tweet_count: 48
    },
    {
      end: '2022-12-02T22:00:00.000Z',
      start: '2022-12-02T21:00:00.000Z',
      tweet_count: 78
    },
    {
      end: '2022-12-02T23:00:00.000Z',
      start: '2022-12-02T22:00:00.000Z',
      tweet_count: 36
    }
  ],
  meta: {
    total_tweet_count: 162
  }
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
        body: mockedMentionsByKeyword
      });

      const keyword = 'posi';
      await getTwitterMentionsCount(keyword);

      const params = {
        query: keyword
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`
        }
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
    });

    it('should call needle with startTime parameter', async () => {
      needle.mockResolvedValue({
        body: mockedMentionsByKeyword
      });

      const keyword = 'posi';
      const startTime = '2022-11-20T03:00:00+0300';
      await getTwitterMentionsCount(keyword, startTime);

      const params = {
        query: keyword,
        start_time: startTime
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`
        }
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
    });

    it('should call needle with endTime parameter', async () => {
      needle.mockResolvedValue({
        body: mockedMentionsByKeyword
      });

      const keyword = 'posi';
      const endTime = '2022-11-20T03:00:00+0300';
      await getTwitterMentionsCount(keyword, undefined, endTime);

      const params = {
        query: keyword,
        end_time: endTime
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`
        }
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
    });
  });

  describe('data flow', () => {
    it('should return mentions as it is (without any formatting)', async () => {
      needle.mockResolvedValue({
        body: mockedMentionsByKeyword
      });

      const keyword = 'posi';
      const result = await getTwitterMentionsCount(keyword);

      const params = {
        query: keyword
      };

      const headers = {
        headers: {
          'User-Agent': 'v2TweetLookupJS',
          authorization: `Bearer ${token}`
        }
      };

      expect(needle).toBeCalledWith('get', endpointURL, params, headers);
      expect(result).toEqual(mockedMentionsByKeyword);
    });
  });
});
