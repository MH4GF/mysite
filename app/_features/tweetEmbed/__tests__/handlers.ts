import { HttpResponse, http } from "msw";
import type { Tweet } from "react-tweet/api";

// react-tweet の client ビルドは SWR で syndication API を叩く (dist/hooks.js)。
// ストーリーを外部ネットワークから切り離すため、この URL を MSW で傍受する。
const HOST = "https://react-tweet.vercel.app";

export const SAMPLE_TWEET_ID = "1234567890123456789";

// アバターを外部 URL にすると VRT が外部サービスの可用性に左右されるため data URI で固定する。
const AVATAR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+";

const SAMPLE_TWEET: Tweet = {
  __typename: "Tweet",
  lang: "ja",
  created_at: "2026-01-15T09:00:00.000Z",
  display_text_range: [0, 24],
  entities: { hashtags: [], urls: [], user_mentions: [], symbols: [] },
  id_str: SAMPLE_TWEET_ID,
  text: "ツイート本文のプレースホルダです。",
  user: {
    id_str: "1111111111",
    name: "テストユーザー",
    profile_image_url_https: AVATAR,
    profile_image_shape: "Circle",
    screen_name: "test_user",
    verified: false,
    is_blue_verified: false,
  },
  edit_control: {
    edit_tweet_ids: [SAMPLE_TWEET_ID],
    editable_until_msecs: "0",
    is_edit_eligible: false,
    edits_remaining: "5",
  },
  isEdited: false,
  isStaleEdit: false,
  favorite_count: 42,
  conversation_count: 3,
  news_action_type: "conversation",
};

export const handlers = [
  http.get(`${HOST}/api/tweet/${SAMPLE_TWEET_ID}`, () => {
    return HttpResponse.json({ data: SAMPLE_TWEET });
  }),
];
