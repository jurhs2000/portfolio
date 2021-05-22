const plugins = require('./postcss.config').plugins
const sveltePreprocess = require('svelte-preprocess')

const preprocessOptions = {
  // Aquí se configuraría babel si tuviera que usarse
  postcss: {
    sync: true,
    plugins,
  },
}

module.exports = {
  preprocess: sveltePreprocess(preprocessOptions),
  preprocessOptions,
}
