const webpackConfig = require('./webpack.config')(null, {
  mode: 'development',
});

module.exports = (config) => {
  config.set({
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    client: {
      captureConsole: false, // Don't show console output.
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    files: ['test.webpack.js'],
    frameworks: ['chai', 'mocha'],
    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map',
    }),
    webpackMiddleware: {
      stats: 'errors-only',
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
