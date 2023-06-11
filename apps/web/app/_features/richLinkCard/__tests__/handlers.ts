import { rest } from 'msw'

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
`

export const SAMPLE_URL = 'https://mh4gf.dev'
export const NO_DATA_URL = 'https://nodata.mh4gf.dev'

export const handlers = [
  rest.get(SAMPLE_URL, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.body(SAMPLE_HTML))
  }),
  rest.get(NO_DATA_URL, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.body(''))
  }),
]
