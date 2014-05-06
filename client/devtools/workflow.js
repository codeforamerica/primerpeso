/ Adds LiveReload script pointing at the client's hostname.
// This is helpful for mobile web development where your desktop might point at localhost while
// your devices point to a local IP address.
document.write('<script src="http://'
 + window.location.hostname
 + ':35729/livereload.js?snipver=1" type="text/javascript"><\/script>')