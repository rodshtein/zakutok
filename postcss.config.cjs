const easyImport = require('postcss-easy-import');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');
const nestedProps = require('postcss-nested-props');
const presetEnv = require('postcss-preset-env')({
  stage: 0,
  features: {
    "nesting-rules": true,
  },
});



module.exports = {
  plugins: [
    easyImport,
    mixins,
    nested,
    nestedProps,
    presetEnv
  ]
}