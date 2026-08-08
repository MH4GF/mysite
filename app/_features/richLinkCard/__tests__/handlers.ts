import { HttpResponse, http } from "msw";

const SAMPLE_HTML = `
<!doctype html>
<html>
  <head>
    <title>Example Domain</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="Example Domain" />
    <meta property="og:locale" content="en_US" />
    <meta name="description" content="Hello! This is example :)" />
    <meta property="og:description" content="Hello! This is example :)" />
    <meta property="og:url" content="https://mh4gf.dev/" />
    <meta property="og:site_name" content="Example Domain" />
    <meta property="og:image" content="https://mh4gf.dev/assets/images/social-card.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content="https://mh4gf.dev/assets/images/social-card.png" />
    <meta property="twitter:title" content="Example Domain" />
    <meta name="twitter:site" content="@example" />
  </head>
<body>
  <div>
    <h1>Example Domain</h1>
  </div>
</body>
</html>
`;

// title / description が <meta property="title"> / <meta property="description">
// （og: 接頭辞なし）でのみ提供されるページ。og:image を持たない
const LEGACY_META_HTML = `
<!doctype html>
<html>
  <head>
    <title>Legacy Meta Domain</title>
    <meta property="title" content="Legacy Meta Domain" />
    <meta property="description" content="Legacy style meta tags" />
  </head>
<body>
  <div>
    <h1>Legacy Meta Domain</h1>
  </div>
</body>
</html>
`;

// title / description が twitter:* の name 属性メタでのみ提供されるページ
const TWITTER_META_HTML = `
<!doctype html>
<html>
  <head>
    <title>Twitter Meta Domain</title>
    <meta name="twitter:title" content="Twitter Meta Domain" />
    <meta name="twitter:description" content="Twitter style meta tags" />
  </head>
<body>
  <div>
    <h1>Twitter Meta Domain</h1>
  </div>
</body>
</html>
`;

export const SAMPLE_URL = "https://mh4gf.dev";
export const NO_DATA_URL = "https://nodata.mh4gf.dev";
export const LEGACY_META_URL = "https://legacy.mh4gf.dev";
export const TWITTER_META_URL = "https://twitter-meta.mh4gf.dev";
export const FETCH_ERROR_URL = "https://network-error.mh4gf.dev";

export const handlers = [
  http.get(SAMPLE_URL, () => {
    return new HttpResponse(SAMPLE_HTML, { status: 200 });
  }),
  http.get(NO_DATA_URL, () => {
    return HttpResponse.json("", { status: 200 });
  }),
  http.get(LEGACY_META_URL, () => {
    return new HttpResponse(LEGACY_META_HTML, { status: 200 });
  }),
  http.get(TWITTER_META_URL, () => {
    return new HttpResponse(TWITTER_META_HTML, { status: 200 });
  }),
  http.get(FETCH_ERROR_URL, () => {
    return HttpResponse.error();
  }),
];
