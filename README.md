### Contribute

```cmd
~S git clone git@github.com:mugiwarafx/khan-academy-check-your-answer-before-submit.git
~$ npm install -y
~$ npm run build
```

npm run build command generates a dist folder that you can upload to the following URL (Google Chrome) chrome://extensions

### TODO

- [x] Set up the project as TypeScript ready.
- [x] Protect master branch, only reviewed PR allowed.
- [x] Capture enter key
- [x] Match KA styles (we don't need it any more since all the magic happens behind de scenes)
- [x] Separate KA elemnts from custom elements (namespace) Not needed, the extension has its own namespace.
- [x] Run main functionality as listener each time check answer button is clicked 
- [x] Design extension icon
- [x] Set up a proper README.md
- [ ] Make this component a11y (handle focus when our answer is not correct)
- [ ] Migrate to TypeScript
- [ ] Upload the extension to the chrome store
