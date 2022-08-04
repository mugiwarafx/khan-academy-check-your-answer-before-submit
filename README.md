### Contribute

```cmd
~S git clone git@github.com:mugiwarafx/khan-academy-check-your-answer-before-submit.git
~$ npm install -y
~$ npm run build
```

npm run build command generates a dist folder that you can upload to the following URL (Google Chrome) chrome://extensions

### TODO list

- [x] Set up the project as TypeScript ready.
- [x] Protect master branch, only reviewed PR allowed.
- [x] Capture enter key
- [x] Match KA styles (we don't need it any more since all the magic happens behind de scenes)
- [x] Separate KA elemnts from custom elements (namespace) Not needed, the extension has its own namespace.
- [x] We have to listen the check answer button, and each time it contains the text "Next question" and is clicked, we run main (recursively)
- [ ] Make this component a11y 
- [ ] Design extension icon
- [ ] Set up a proper README.md
