## Working on BizWallet

For everything you do, please make a separate branch.

Whenever you need to link to a static asset, such as a CSS / JS / or an image file in a template, please wrap the link in a CDN() function like so:
```
a(href=CDN('/path/to/my/asset.js'))
```
That will allow the system to know which bucket to link to.

Master branch will automatically get deployed to http://bizwallet-staging.herokuapp.com
Production branch will automatically get deployed to http://bizwallet.herokuapp.com
