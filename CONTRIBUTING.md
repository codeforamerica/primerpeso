## Trabajando en Biz Wallet

Para todo lo que hagas, por favor crea una nueva branch. 

Siempre que necesites linkear a una página estática, como un CSS / JS / o un archivo de imagen en un template, incluye el enlace en una función CDN () de esta manera:
`` `
a(href=CDN('/path/to/my/asset.js'))
```
Esto le permitirá al sistema saber a donde linkearlo.

La Rama Maestra automáticamente será deployed a http://bizwallet-staging.herokuapp.com
La Rama de producción automáticamente será deployed a http://bizwallet.herokuapp.com