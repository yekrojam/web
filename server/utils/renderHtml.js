import webpackManifest from '../../public/build/webpack-manifest.json';

import { APP_NAME } from '../../constants/app';

// TODO: Add code-splitting.
const chunkManifest = {};

/* eslint-disable max-len */
export default (children, data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <title>${APP_NAME}</title>
        <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="${webpackManifest['app.css']}" />
      </head>
      <body>
        <div id="root">${children}</div>
        <script>window.chunkManifest = ${JSON.stringify(chunkManifest)};</script>
        <script>window.APP_DATA = ${JSON.stringify(data)};</script>
        <script src="${webpackManifest['vendor.js']}"></script>
        <script src="${webpackManifest['app.js']}"></script>
      </body>
    </html>
  `;
/* eslint-enable max-len */
