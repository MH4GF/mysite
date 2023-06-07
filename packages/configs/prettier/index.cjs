const defaultConfig = require('@mh4gf/configs/prettier')

module.exports = {
  ...defaultConfig,
  plugins: [...defaultConfig.plugins, require('prettier-plugin-tailwindcss')],
}
