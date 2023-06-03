const defaultConfig = require('@mh4gf/prettier-config')

module.exports = {
  ...defaultConfig,
  plugins: [...defaultConfig.plugins, require('prettier-plugin-tailwindcss')],
}
